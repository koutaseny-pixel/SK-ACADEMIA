const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  try {
    // 1. Get a real product ID
    const { data: products } = await supabase.from('products').select('id, name, price').limit(1);
    const product = products && products.length > 0 ? products[0] : { id: crypto.randomUUID(), name: "Test Product", price: 100 };
    console.log("Using product:", product);

    // 2. Call the live API
    // Native fetch is supported in Node 24
    const res = await global.fetch("https://sk-academia-z2mc.vercel.app/api/payment/paytech/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formData: { firstName: "Test", lastName: "Test", email: "test@test.com", phone: "12345678" },
        items: [{ id: product.id, name: product.name, price: product.price, quantity: 1 }]
      })
    });
    
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("RESPONSE:", text);
  } catch (e) {
    console.error("ERROR:", e);
  }
}

test();
