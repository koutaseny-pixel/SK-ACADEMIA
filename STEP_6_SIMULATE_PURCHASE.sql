DO $$
DECLARE
    v_user_id UUID;
    v_product_id UUID;
    v_order_id UUID;
BEGIN
    -- 1. Récupérer l'ID de l'utilisateur admin
    SELECT id INTO v_user_id FROM auth.users WHERE email = 'skacademia25@gmail.com' LIMIT 1;
    
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Utilisateur admin introuvable.';
    END IF;

    -- 2. Récupérer le premier produit publié
    SELECT id INTO v_product_id FROM public.products WHERE is_published = true LIMIT 1;

    IF v_product_id IS NULL THEN
        RAISE EXCEPTION 'Aucun produit publié trouvé. Veuillez d''abord ajouter un produit avec un fichier PDF depuis l''administration.';
    END IF;

    -- 3. Insérer une fausse commande "payée"
    INSERT INTO public.orders (user_id, reference, customer_email, customer_first_name, customer_last_name, total_amount, status, payment_method)
    VALUES (v_user_id, 'TEST-' || substr(md5(random()::text), 1, 6), 'skacademia25@gmail.com', 'Admin', 'Test', 0, 'paid', 'simulation')
    RETURNING id INTO v_order_id;

    -- 4. Insérer l'article de la commande
    INSERT INTO public.order_items (order_id, product_id, product_name, price)
    VALUES (v_order_id, v_product_id, (SELECT name FROM public.products WHERE id = v_product_id), 0);

END $$;
