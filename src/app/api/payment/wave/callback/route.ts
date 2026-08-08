import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { createHmac } from "crypto";

// Wave signs webhooks with HMAC-SHA256 of the raw body
function verifyWaveSignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  try {
    const expectedSignature = createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");
    // Wave sends "sha256=<hash>" or just "<hash>" depending on version
    const receivedHash = signature.replace(/^sha256=/, "");
    return expectedSignature === receivedHash;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const waveSignature = request.headers.get("wave-signature") || 
                        request.headers.get("x-wave-signature") || "";

  // 1. Verify webhook signature
  const webhookSecret = process.env.WAVE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("WAVE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  if (waveSignature && !verifyWaveSignature(rawBody, waveSignature, webhookSecret)) {
    console.warn("Invalid Wave webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log("Wave webhook received:", JSON.stringify(payload, null, 2));

  // 2. Extract fields — Wave sends different shapes depending on event type
  // Typical checkout webhook: { type: "checkout.session.completed", data: { ... } }
  // Or direct: { payment_status, client_reference, amount, ... }
  const eventType = payload.type || payload.event;
  const data = payload.data || payload;

  const paymentStatus = data.payment_status || data.status;
  const clientReference = data.client_reference || data.client_ref;

  // Only process successful payments
  if (paymentStatus !== "succeeded" && paymentStatus !== "complete") {
    console.log(`Wave webhook: payment status is "${paymentStatus}", skipping.`);
    // Respond 200 so Wave doesn't retry
    return NextResponse.json({ received: true, action: "skipped" });
  }

  if (!clientReference) {
    console.error("Wave webhook: missing client_reference");
    return NextResponse.json({ error: "Missing client_reference" }, { status: 400 });
  }

  // 3. Find the order by reference
  const supabase = await createClient();

  const { data: order, error: findError } = await supabase
    .from("orders")
    .select("id, status, reference")
    .eq("reference", clientReference)
    .single();

  if (findError || !order) {
    console.error(`Wave webhook: order not found for reference "${clientReference}"`);
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // 4. Idempotency check — don't double-process
  if (order.status === "paid") {
    console.log(`Order ${clientReference} already marked as paid. Idempotency check passed.`);
    return NextResponse.json({ received: true, action: "already_paid" });
  }

  // 5. Mark order as PAID → downloads automatically unlocked
  const { error: updateError } = await supabase
    .from("orders")
    .update({ status: "paid" })
    .eq("id", order.id);

  if (updateError) {
    console.error("Failed to update order status:", updateError);
    return NextResponse.json({ error: "DB update failed" }, { status: 500 });
  }

  console.log(`✅ Order ${clientReference} marked as PAID. Downloads unlocked.`);

  // 6. Respond 200 — Wave expects this quickly
  return NextResponse.json({ received: true, action: "order_paid", reference: clientReference });
}
