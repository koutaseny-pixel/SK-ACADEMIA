-- 1. CREER LES DOSSIERS (BUCKETS)
INSERT INTO storage.buckets (id, name, public) VALUES ('product-covers', 'product-covers', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('product-files', 'product-files', false) ON CONFLICT DO NOTHING;

-- 2. SECURITES POUR LES DOSSIERS
-- Les images sont publiques
CREATE POLICY "Images publiques" ON storage.objects FOR SELECT USING ( bucket_id = 'product-covers' );

-- L'admin peut tout faire
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK ( auth.role() = 'authenticated' );
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING ( auth.role() = 'authenticated' );
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING ( auth.role() = 'authenticated' );

-- Les acheteurs peuvent télécharger
CREATE POLICY "Read Files" ON storage.objects FOR SELECT USING ( auth.role() = 'authenticated' );
