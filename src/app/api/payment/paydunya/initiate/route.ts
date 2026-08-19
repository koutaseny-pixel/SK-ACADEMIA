import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { formData, items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    
    // API KEYS PAYDUNYA
    const MASTER_KEY = process.env.PAYDUNYA_MASTER_KEY;
    const PRIVATE_KEY = process.env.PAYDUNYA_PRIVATE_KEY;
    const TOKEN = process.env.PAYDUNYA_TOKEN;

    if (!MASTER_KEY || !PRIVATE_KEY || !TOKEN || MASTER_KEY === "VOTRE_MASTER_KEY") {
      console.error("Clés PayDunya non configurées");
      return NextResponse.json({ error: "Configuration PayDunya manquante sur le serveur. Veuillez configurer le fichier .env.local" }, { status: 500 });
    }

    // L'environnement cible est déterminé par la présence de "test" dans le master key par exemple,
    // mais par défaut l'API Sandbox et Live ont des URL différentes.
    const isTest = MASTER_KEY.includes("test");
    const payDunyaApiUrl = isTest
      ? "https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create"
      : "https://app.paydunya.com/api/v1/checkout-invoice/create";

    // Générer un ID de transaction unique
    const transactionId = `SK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const payload = {
      invoice: {
        total_amount: totalAmount,
        description: `Paiement SK Academia - Commande ${transactionId}`
      },
      store: {
        name: "SK Academia",
        website_url: BASE_URL
      },
      custom_data: {
        transaction_id: transactionId,
        customer_email: formData.email,
        customer_name: `${formData.firstName || ""} ${formData.lastName || ""}`.trim()
      },
      actions: {
        cancel_url: `${BASE_URL}/checkout?error=payment_cancelled`,
        return_url: `${BASE_URL}/success?ref=${transactionId}`,
        callback_url: `${BASE_URL}/api/payment/paydunya/callback` // Webhook (IPN) url
      }
    };

    console.log("PayDunya Init Payload:", payload);

    const response = await fetch(payDunyaApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "PAYDUNYA-MASTER-KEY": MASTER_KEY,
        "PAYDUNYA-PRIVATE-KEY": PRIVATE_KEY,
        "PAYDUNYA-TOKEN": TOKEN
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.response_code === "00") {
      // Succès de l'initialisation
      // 📝 Ici vous devriez normalement enregistrer la commande en base de données avec le statut "pending"
      // const supabase = await createClient();
      // await supabase.from('orders').insert({ id: transactionId, total: totalAmount, status: 'pending', ... })

      return NextResponse.json({ redirect_url: data.response_text }); // URL de redirection vers le guichet
    } else {
      console.error("Erreur API PayDunya:", data);
      return NextResponse.json({ error: data.response_text || "Erreur lors de la communication avec PayDunya." }, { status: 400 });
    }

  } catch (error) {
    console.error("Erreur serveur initiation PayDunya:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}
