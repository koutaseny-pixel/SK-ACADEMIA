import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { formData, items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    
    // API KEY BICTORYS
    const API_KEY = process.env.BICTORYS_API_KEY;

    if (!API_KEY || API_KEY === "VOTRE_API_KEY_BICTORYS") {
      console.error("Clé Bictorys non configurée");
      return NextResponse.json({ error: "Configuration Bictorys manquante sur le serveur. Veuillez configurer le fichier .env.local" }, { status: 500 });
    }

    // Générer un ID de transaction unique
    const transactionId = `SK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const payload = {
      amount: totalAmount,
      currency: "XOF",
      country: "SN",
      merchantReference: transactionId,
      successRedirectUrl: `${BASE_URL}/success?ref=${transactionId}`,
      errorRedirectUrl: `${BASE_URL}/checkout?error=payment_failed`,
      customerObject: {
        name: `${formData.firstName || ""} ${formData.lastName || ""}`.trim() || "Client Inconnu",
        email: formData.email,
        phone: formData.phone || "000000000",
        country: "SN"
      }
    };

    console.log("Bictorys Init Payload:", payload);

    const isTest = API_KEY.startsWith("test_");
    const bictorysApiUrl = isTest 
      ? "https://api.test.bictorys.com/pay/v1/charges" 
      : "https://api.bictorys.com/pay/v1/charges";

    const response = await fetch(bictorysApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.status === 201 || response.status === 202) {
      // Succès de l'initialisation
      // 📝 Ici vous devriez normalement enregistrer la commande en base de données avec le statut "pending"
      // const supabase = await createClient();
      // await supabase.from('orders').insert({ id: transactionId, total: totalAmount, status: 'pending', ... })

      const redirectUrl = data.link || data.redirectUrl;
      return NextResponse.json({ redirect_url: redirectUrl });
    } else {
      console.error("Erreur API Bictorys:", data);
      return NextResponse.json({ error: data.title || data.details || "Erreur lors de la communication avec Bictorys." }, { status: 400 });
    }

  } catch (error) {
    console.error("Erreur serveur initiation Bictorys:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}
