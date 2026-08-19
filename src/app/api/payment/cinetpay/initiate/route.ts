import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { formData, items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    
    const API_KEY = process.env.CINETPAY_API_KEY;
    const SITE_ID = process.env.CINETPAY_SITE_ID;

    if (!API_KEY || !SITE_ID || API_KEY === "VOTRE_API_KEY_CINETPAY") {
      console.error("Clés CinetPay non configurées");
      return NextResponse.json({ error: "Configuration CinetPay manquante sur le serveur. Veuillez configurer le fichier .env.local" }, { status: 500 });
    }

    // Générer un ID de transaction unique
    const transactionId = `SK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const payload = {
      apikey: API_KEY,
      site_id: SITE_ID,
      transaction_id: transactionId,
      amount: totalAmount,
      currency: "XOF",
      description: `Achat SK ACADEMIA - ${items.length} article(s)`,
      customer_name: formData.lastName || "Client",
      customer_surname: formData.firstName || "Inconnu",
      customer_email: formData.email,
      customer_phone_number: formData.phone || "000000000",
      customer_city: "Dakar",
      customer_country: "SN",
      customer_state: "SN",
      customer_zip_code: "00000",
      notify_url: `${BASE_URL}/api/payment/cinetpay/callback`,
      return_url: `${BASE_URL}/success?ref=${transactionId}`,
      channels: "ALL",
      lang: "fr"
    };

    console.log("CinetPay Init Payload:", payload);

    const response = await fetch("https://api-checkout.cinetpay.com/v2/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.code === "201") {
      // Succès de l'initialisation
      // 📝 Ici vous devriez normalement enregistrer la commande en base de données avec le statut "pending"
      // const supabase = await createClient();
      // await supabase.from('orders').insert({ id: transactionId, total: totalAmount, status: 'pending', ... })

      return NextResponse.json({ redirect_url: data.data.payment_url });
    } else {
      console.error("Erreur API CinetPay:", data);
      return NextResponse.json({ error: data.description || "Erreur lors de la communication avec CinetPay." }, { status: 400 });
    }

  } catch (error) {
    console.error("Erreur serveur initiation CinetPay:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}
