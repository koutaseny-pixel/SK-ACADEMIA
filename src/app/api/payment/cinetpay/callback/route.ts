import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    // CinetPay sends notification via POST (form-data or JSON)
    // To handle URL encoded form data correctly:
    const text = await req.text();
    const params = new URLSearchParams(text);
    
    // Convert to object if it's form data, otherwise parse JSON
    let data: any = {};
    if (text.startsWith("{")) {
      try {
        data = JSON.parse(text);
      } catch (e) {
        // Not JSON
      }
    } else {
      for (const [key, value] of params.entries()) {
        data[key] = value;
      }
    }

    console.log("CinetPay Webhook Received:", data);

    const transactionId = data.cpm_trans_id;
    const siteId = data.cpm_site_id;

    if (!transactionId || !siteId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // 1. VERIFY TRANSACTION WITH CINETPAY
    const API_KEY = process.env.CINETPAY_API_KEY;
    const SITE_ID = process.env.CINETPAY_SITE_ID;

    // Verify transaction status by calling CinetPay again
    const verifyPayload = {
      apikey: API_KEY,
      site_id: SITE_ID,
      transaction_id: transactionId
    };

    const verifyResponse = await fetch("https://api-checkout.cinetpay.com/v2/payment/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(verifyPayload)
    });

    const verifyData = await verifyResponse.json();

    if (verifyData.code === "00") {
      // Le paiement a réussi
      console.log(`Payment SUCCESS for transaction: ${transactionId}`);
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      // NOTE: Here you MUST use a Service Role Key, NOT the Anon key, because you need to bypass Row Level Security to update an order from a webhook.
      // const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      // const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

      // Example of updating database:
      /*
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'paid', 
          payment_method: verifyData.data.payment_method || 'cinetpay',
          payment_reference: verifyData.data.receipt_url
        })
        .eq('id', transactionId);
      */

    } else {
      // Le paiement a échoué ou est en attente
      console.log(`Payment FAILED/PENDING for transaction: ${transactionId}. Status: ${verifyData.message}`);
    }

    // 2. Respond 200 OK to CinetPay so they stop sending notifications
    return new NextResponse("OK", { status: 200 });

  } catch (error) {
    console.error("Error in CinetPay Webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
