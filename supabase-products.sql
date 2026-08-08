-- 1. Add missing columns to products table if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='description') THEN
    ALTER TABLE public.products ADD COLUMN description text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='file_url') THEN
    ALTER TABLE public.products ADD COLUMN file_url text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='is_published') THEN
    ALTER TABLE public.products ADD COLUMN is_published boolean DEFAULT false;
  END IF;
END $$;

-- 2. Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-covers', 'product-covers', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-files', 'product-files', false)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage RLS Policies for product-covers (Public Bucket)
-- Anyone can read public covers
CREATE POLICY "Public Access to product-covers" ON storage.objects FOR SELECT USING (bucket_id = 'product-covers');

-- Only admins can insert, update, or delete covers
CREATE POLICY "Admin Insert product-covers" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'product-covers' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admin Update product-covers" ON storage.objects FOR UPDATE USING (
  bucket_id = 'product-covers' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admin Delete product-covers" ON storage.objects FOR DELETE USING (
  bucket_id = 'product-covers' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 4. Storage RLS Policies for product-files (Private Bucket)
-- Only admins can insert, update, or delete private files
CREATE POLICY "Admin Insert product-files" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'product-files' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admin Update product-files" ON storage.objects FOR UPDATE USING (
  bucket_id = 'product-files' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admin Delete product-files" ON storage.objects FOR DELETE USING (
  bucket_id = 'product-files' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Note: Customer access to product-files will be handled via server-side Signed URLs
-- when checking if the customer has actually purchased the product. So no SELECT policy is needed for customers here.
CREATE POLICY "Admin Select product-files" ON storage.objects FOR SELECT USING (
  bucket_id = 'product-files' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
