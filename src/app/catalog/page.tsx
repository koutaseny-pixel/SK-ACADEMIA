import { createClient } from "@/lib/supabase/server";
import CatalogClient from "@/components/catalog/CatalogClient";

export default async function Catalog({ searchParams }: { searchParams: { category?: string } }) {
  // Wait for searchParams (Next 15+)
  const params = await searchParams;
  const initialCategory = params?.category;

  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  // Adding mock badges to some products to showcase the badge feature
  const catalogProducts = (products || []).map((p, index) => {
    let badge = undefined;
    if (index === 0) badge = "Nouveau";
    else if (index === 2) badge = "Meilleure Vente";
    
    return {
      ...p,
      badge
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CatalogClient initialProducts={catalogProducts} initialCategory={initialCategory} />
    </div>
  );
}
