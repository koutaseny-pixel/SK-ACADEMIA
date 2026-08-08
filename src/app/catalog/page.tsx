import { createClient } from "@/lib/supabase/server";
import CatalogClient from "@/components/catalog/CatalogClient";

export default async function Catalog({ searchParams }: { searchParams: { category?: string, search?: string, sort?: string } }) {
  // Wait for searchParams (Next 15+)
  const params = await searchParams;
  const currentCategory = params?.category;
  const currentSearch = params?.search;
  const currentSort = params?.sort || 'recommended';

  const supabase = await createClient();
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  if (currentCategory) {
    query = query.eq('category', currentCategory);
  }

  if (currentSearch) {
    query = query.ilike('name', `%${currentSearch}%`);
  }

  // Handle sorting
  if (currentSort === 'price-asc') {
    query = query.order('price', { ascending: true });
  } else if (currentSort === 'price-desc') {
    query = query.order('price', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CatalogClient 
        products={products || []} 
        currentCategory={currentCategory}
        currentSearch={currentSearch}
        currentSort={currentSort}
      />
    </div>
  );
}
