// dotenv removed
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLogin() {
    const loginRes = await supabase.auth.signInWithPassword({
        email: 'koutaseny@gmail.com',
        password: 'Kouta25@08',
    });
    if (loginRes.error) {
        console.error('Login failed:', loginRes.error.message);
    } else {
        console.log('Success: Account is fully active and can log in without OTP!');
    }
}

checkLogin();
