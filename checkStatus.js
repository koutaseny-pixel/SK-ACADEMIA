// dotenv removed
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLogin() {
    const loginRes = await supabase.auth.signInWithPassword({
        email: 'skacademia25@gmail.com',
        // They used their own password, so I can't check the password.
        // But I can try with a dummy password and see the error message.
        password: 'dummy',
    });
    console.log(loginRes.error.message);
}

checkLogin();
