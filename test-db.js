// no dotenv
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const reference = `SK-TEST-${Date.now()}`;
  const id = crypto.randomUUID();
  console.log("Inserting order without select()...");
  const { data, error } = await supabase.from('orders').insert({
    id,
    reference,
    user_id: null,
    customer_first_name: "Test",
    customer_last_name: "Test",
    customer_email: "test@test.com",
    customer_phone: "12345678",
    total_amount: 100,
    payment_method: "paytech",
    status: "pending"
  });

  console.log("ERROR:", error);
  console.log("DATA:", data);
}

test();
