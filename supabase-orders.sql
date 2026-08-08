-- Drop tables if they exist to allow clean recreation
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;

-- Table: orders
CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  reference text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_first_name text NOT NULL,
  customer_last_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  total_amount numeric NOT NULL,
  status text DEFAULT 'pending' NOT NULL, -- pending, paid, cancelled
  payment_method text NOT NULL
);

-- Table: order_items
CREATE TABLE order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  quantity integer NOT NULL,
  price_at_time numeric NOT NULL
);

-- Add Row Level Security (RLS) policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (since users are not logged in yet)
CREATE POLICY "Anyone can insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert order items" ON order_items FOR INSERT WITH CHECK (true);

-- Only authenticated users (admins) can view all orders
-- (Assuming you will manage them in the Supabase Dashboard for now)
CREATE POLICY "Admins can view orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can view order items" ON order_items FOR SELECT USING (auth.role() = 'authenticated');
