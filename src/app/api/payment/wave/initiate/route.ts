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

    if (!process.env.WAVE_API_KEY || !process.env.NEXT_PUBLIC_BASE_URL) {
      console.error("Wave API key or Base URL not configured");
      return NextResponse.json({ error: "Paiement non configuré" }, { status: 500 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Calculate total
    const total = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    // Generate a unique reference
    const reference = `SK-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Create the order in DB (pending)
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        reference,
        user_id: user?.id || null,
        customer_first_name: formData.firstName,
        customer_last_name: formData.lastName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        total_amount: total,
        payment_method: "wave",
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      throw orderError;
    }

    // 2. Insert order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
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
      await supabase.from("orders").delete().eq("id", order.id);
      throw itemsError;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // 3. Create Wave Checkout Session
    const waveResponse = await fetch("https://api.wave.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WAVE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total.toString(),
        currency: "XOF",
        client_reference: reference,
        success_url: `${baseUrl}/success?ref=${reference}`,
        error_url: `${baseUrl}/checkout?error=payment_failed&ref=${reference}`,
      }),
    });

    if (!waveResponse.ok) {
      const waveError = await waveResponse.text();
      console.error("Wave API error:", waveError);
      // Mark order as cancelled if Wave fails
      await supabase.from("orders").update({ status: "cancelled" }).eq("id", order.id);
      return NextResponse.json(
        { error: "Erreur lors de la création de la session de paiement Wave." },
        { status: 502 }
      );
    }

    const waveData = await waveResponse.json();
    const { wave_launch_url } = waveData;

    if (!wave_launch_url) {
      console.error("No wave_launch_url in response:", waveData);
      await supabase.from("orders").update({ status: "cancelled" }).eq("id", order.id);
      return NextResponse.json(
        { error: "Réponse invalide de Wave." },
        { status: 502 }
      );
    }

    return NextResponse.json({ wave_launch_url, reference });
  } catch (error: any) {
    console.error("Initiate payment error:", error);
    return NextResponse.json(
      { error: error.message || "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
