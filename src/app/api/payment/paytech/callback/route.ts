import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

export async function POST(request: Request) {
  try {
    // 1. Check content type (PayTech sends application/x-www-form-urlencoded or application/json depending on integration, usually JSON or URL-encoded form)
    let data: any;
    const contentType = request.headers.get("content-type") || "";
    
    if (contentType.includes("application/json")) {
      data = await request.json();
    } else {
      // In case they send it as form data
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    }

    console.log("PayTech IPN received:", data);

    const API_KEY = process.env.PAYTECH_API_KEY;
    const API_SECRET = process.env.PAYTECH_API_SECRET;

    if (!API_KEY || !API_SECRET) {
      console.error("PAYTECH_API_KEY or PAYTECH_API_SECRET not set on server");
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    // 2. Verify Authenticity (Check SHA256 hashes sent by PayTech)
    const expectedKeyHash = createHash("sha256").update(API_KEY).digest("hex");
    const expectedSecretHash = createHash("sha256").update(API_SECRET).digest("hex");

    if (
      data.api_key_sha256 !== expectedKeyHash ||
      data.api_secret_sha256 !== expectedSecretHash
    ) {
      console.error("Invalid PayTech IPN signature. Request rejected.");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 3. Process the Event
    const typeEvent = data.type_event;
    const clientReference = data.ref_command;

    // Only process successful sales
    if (typeEvent !== "sale_complete") {
      console.log(`PayTech IPN event "${typeEvent}", skipping order update.`);
      return NextResponse.json({ success: 1, message: "Event ignored" });
    }

    if (!clientReference) {
      console.error("Missing ref_command in PayTech IPN");
      return NextResponse.json({ error: "Missing ref_command" }, { status: 400 });
    }

    // 4. Update the Order in the Database
    const supabase = await createClient();

    const { data: order, error: findError } = await supabase
      .from("orders")
      .select("id, status, reference")
      .eq("reference", clientReference)
      .single();

    if (findError || !order) {
      console.error(`Order not found for PayTech reference "${clientReference}"`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Idempotency check
    if (order.status === "paid") {
      console.log(`Order ${clientReference} already marked as paid.`);
      return NextResponse.json({ success: 1, message: "Already paid" });
    }

    // Update order status to paid, auto-unlocking downloads!
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: "paid", payment_method: data.payment_method || "paytech" })
      .eq("id", order.id);

    if (updateError) {
      console.error("Failed to update order status:", updateError);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }

    console.log(`✅ Order ${clientReference} marked as PAID. Downloads unlocked.`);
    
    // 5. Respond 200 OK to PayTech
    return NextResponse.json({ success: 1 });
  } catch (err: any) {
    console.error("Error in PayTech IPN:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
