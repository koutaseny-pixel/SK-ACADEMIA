// dotenv removed
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function resend() {
    const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email: 'koutaseny@gmail.com',
    });
    if (error) {
        console.error('Failed to resend:', error.message);
    } else {
        console.log('Successfully resent confirmation email!');
    }
}

resend();
