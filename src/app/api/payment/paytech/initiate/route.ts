import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, items } = body;

    // Validate required fields
    if (!formData?.firstName || !formData?.email || !items?.length) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    const API_KEY = process.env.PAYTECH_API_KEY;
    const API_SECRET = process.env.PAYTECH_API_SECRET;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    if (!API_KEY || !API_SECRET || !BASE_URL) {
      console.error("PayTech API keys or Base URL not configured");
      return NextResponse.json({ error: "Paiement non configuré sur le serveur" }, { status: 500 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Calculate total
    const total = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    // Generate a unique reference and order ID
    const reference = `SK-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderId = crypto.randomUUID();

    // 1. Create the order in DB (pending) - NO .select() to avoid RLS read restrictions!
    const { error: orderError } = await supabase
      .from("orders")
      .insert({
        id: orderId,
        reference,
        user_id: user?.id || null,
        customer_first_name: formData.firstName,
        customer_last_name: formData.lastName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        total_amount: total,
        payment_method: "paytech", // Storing paytech generically
        status: "pending",
      });

    if (orderError) {
      console.error("Order creation error:", orderError);
      throw orderError;
    }

    // 2. Insert order items
    const orderItems = items.map((item: any) => ({
      order_id: orderId,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price_at_time: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      // Rollback order if items fail
      await supabase.from("orders").delete().eq("id", orderId);
      throw itemsError;
    }

    // 3. Create PayTech Payment Request
    const paytechBody = {
      item_name: items.length === 1 ? items[0].name : `Commande de ${items.length} articles`,
      item_price: total,
      currency: "XOF",
      ref_command: reference,
      command_name: `Paiement commande ${reference} sur SK Academia`,
      env: "test", // Change to "prod" once your PayTech account is activated for production!
      ipn_url: `${BASE_URL}/api/payment/paytech/callback`,
      success_url: `${BASE_URL}/success?ref=${reference}`,
      cancel_url: `${BASE_URL}/checkout?error=payment_cancelled`,
      custom_field: JSON.stringify({ order_id: orderId, email: formData.email })
    };

    const paytechResponse = await fetch("https://paytech.sn/api/payment/request-payment", {
      method: "POST",
      headers: {
        "API_KEY": API_KEY,
        "API_SECRET": API_SECRET,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paytechBody),
    });

    if (!paytechResponse.ok) {
      const errorText = await paytechResponse.text();
      console.error("PayTech API HTTP error:", errorText);
      await supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
      return NextResponse.json(
        { error: "Erreur HTTP lors de la communication avec PayTech." },
        { status: 502 }
      );
    }

    const paytechData = await paytechResponse.json();

    if (paytechData.success !== 1) {
      console.error("PayTech API logical error:", paytechData);
      await supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
      return NextResponse.json(
        { error: "Erreur logique de l'API PayTech." },
        { status: 502 }
      );
    }

    const redirectUrl = paytechData.redirect_url || paytechData.redirectUrl;

    if (!redirectUrl) {
      console.error("No redirect URL in PayTech response:", paytechData);
      await supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
      return NextResponse.json(
        { error: "Réponse PayTech invalide (URL manquante)." },
        { status: 502 }
      );
    }

    // 4. Return URL to frontend to redirect the user
    return NextResponse.json({ redirect_url: redirectUrl, reference });

  } catch (error: any) {
    console.error("Initiate payment error:", error);
    return NextResponse.json(
      { error: error.message || "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
