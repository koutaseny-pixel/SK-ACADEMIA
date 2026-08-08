// dotenv removed
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function addDummyProduct() {
    console.log("Logging in...");
    const loginRes = await supabase.auth.signInWithPassword({
        email: 'skacademia25@gmail.com',
        password: 'Kouta25@08',
    });

    if (loginRes.error) {
        console.error('Login failed:', loginRes.error.message);
        return;
    }
    
    console.log("Logged in successfully. Inserting product...");
    
    const { data, error } = await supabase.from('products').insert([{
        name: 'Pack Préparation Concours - Mathématiques',
        category: 'prepa',
        price: 5000,
        badge: 'Nouveau',
        description: 'Un fascicule complet pour réviser toutes les épreuves de mathématiques avec des annales corrigées.',
        is_published: true,
        image_url: 'https://images.unsplash.com/photo-1633613286991-611fe299c4bf?q=80&w=1000&auto=format&fit=crop',
        file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }]);

    if (error) {
        console.error('Failed to insert product:', error.message);
    } else {
        console.log('Success! Product added.');
    }
}

addDummyProduct();
