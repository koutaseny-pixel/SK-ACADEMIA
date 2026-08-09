async function testPaytech() {
  const API_KEY = "b8fc04645e5d7b750a2d736f8ef580dac606810949d52b5232de88ee8031a4bb";
  const API_SECRET = "wrong_secret";
  
  const reference = `SK-TEST-${Date.now()}`;
  
  const paytechBody = {
    item_name: "Test item",
    item_price: 100,
    currency: "XOF",
    ref_command: reference,
    command_name: "Paiement test",
    env: "test", 
    ipn_url: `https://sk-academia-z2mc.vercel.app/api/payment/paytech/callback`,
    success_url: `https://sk-academia-z2mc.vercel.app/success?ref=${reference}`,
    cancel_url: `https://sk-academia-z2mc.vercel.app/checkout?error=payment_cancelled`,
    custom_field: JSON.stringify({ order_id: "test", email: "test@test.com" })
  };

  console.log("Calling PayTech...");
  const paytechResponse = await global.fetch("https://paytech.sn/api/payment/request-payment", {
    method: "POST",
    headers: {
      "API_KEY": API_KEY,
      "API_SECRET": API_SECRET,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paytechBody),
  });

  const text = await paytechResponse.text();
  console.log("STATUS:", paytechResponse.status);
  console.log("RESPONSE:", text);
}

testPaytech();
