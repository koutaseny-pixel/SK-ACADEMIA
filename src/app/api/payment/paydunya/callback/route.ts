import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    // PayDunya sends a POST request with the invoice data
    const text = await req.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // If not JSON, try parsing as URL encoded
      const params = new URLSearchParams(text);
      data = Object.fromEntries(params.entries());
    }

    console.log("PayDunya Webhook Received:", data);

    const transactionId = data?.custom_data?.transaction_id || data?.invoice?.custom_data?.transaction_id || data?.custom_data?.transaction_id;
    const status = data?.status || data?.invoice?.status;

    if (!transactionId) {
       console.log("Webhook ignoré: aucune référence de transaction trouvée.");
       return new NextResponse("OK", { status: 200 }); // On répond 200 pour éviter que PayDunya ne renvoie la notification
    }

    if (status === "completed") {
      console.log(`Payment SUCCESS for transaction: ${transactionId}`);
      
      // Mettre à jour la commande dans Supabase
      // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      // const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      // const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

      // await supabase
      //   .from('orders')
      //   .update({ 
      //     status: 'paid', 
      //     payment_method: 'paydunya',
      //   })
      //   .eq('id', transactionId);

    } else {
      console.log(`Payment FAILED/PENDING for transaction: ${transactionId}. Status: ${status}`);
    }

    // Répondre 200 OK pour accuser réception du webhook
    return new NextResponse("OK", { status: 200 });

  } catch (error) {
    console.error("Error in PayDunya Webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
