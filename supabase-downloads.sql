-- Table: product_downloads
-- Tracks every time a user downloads a file to enforce limits

DROP TABLE IF EXISTS product_downloads;

CREATE TABLE product_downloads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_item_id uuid REFERENCES public.order_items(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  ip_address text
);

-- Add Row Level Security (RLS) policies
ALTER TABLE product_downloads ENABLE ROW LEVEL SECURITY;

-- Users can view their own downloads
CREATE POLICY "Users can view their own downloads" ON product_downloads 
FOR SELECT USING (auth.uid() = user_id);

-- Only admins/service role can insert into product_downloads (via the API route)
-- Or we can allow users to insert their own records if they match user_id
CREATE POLICY "Users can insert their own downloads" ON product_downloads 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view everything
CREATE POLICY "Admins can view all downloads" ON product_downloads 
FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
