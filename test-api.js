// using native fetch

async function test() {
  try {
    const res = await fetch("https://sk-academia-z2mc.vercel.app/api/payment/paytech/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formData: { firstName: "Test", lastName: "Test", email: "test@test.com", phone: "12345678" },
        items: [{ id: "test-id", name: "Test Product", price: 100, quantity: 1 }]
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
