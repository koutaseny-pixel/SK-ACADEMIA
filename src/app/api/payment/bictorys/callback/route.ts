import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("Bictorys Webhook Received:", data);

    // Récupération de la référence de la transaction (ID de commande côté SK Academia)
    // Bictorys renvoie généralement les données de transaction dans un objet event ou transaction
    const transactionId = data.merchantReference || data.transaction?.merchantReference || data.data?.merchantReference;
    
    // Vous pouvez vérifier le statut du webhook
    // Par exemple: data.status === 'SUCCESS' ou data.event === 'charge.success'
    const status = data.status || data.transaction?.status || data.data?.status;

    if (!transactionId) {
       console.log("Webhook ignoré: aucune référence de transaction trouvée.");
       return new NextResponse("OK", { status: 200 }); // On répond 200 pour éviter que Bictorys ne renvoie la notification
    }

    if (status === "SUCCESS" || status === "COMPLETED" || status === "AUTHORIZED" || status === "CAPTURED") {
      console.log(`Payment SUCCESS for transaction: ${transactionId}`);
      
      // Mettre à jour la commande dans Supabase
      // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      // const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      // const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

      // await supabase
      //   .from('orders')
      //   .update({ 
      //     status: 'paid', 
      //     payment_method: 'bictorys',
      //   })
      //   .eq('id', transactionId);

    } else {
      console.log(`Payment FAILED/PENDING for transaction: ${transactionId}. Status: ${status}`);
    }

    // Répondre 200 OK pour accuser réception du webhook
    return new NextResponse("OK", { status: 200 });

  } catch (error) {
    console.error("Error in Bictorys Webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
