import ProductCard from "@/components/ui/ProductCard";
import { createClient } from "@/lib/supabase/server";

export default async function Catalog() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  const catalogProducts = products || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Resource Catalog</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-primary focus:ring-primary" /> Study Guides</label></li>
              <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-primary focus:ring-primary" /> Past Papers</label></li>
              <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-primary focus:ring-primary" /> Ebooks</label></li>
              <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-primary focus:ring-primary" /> Online Courses</label></li>
            </ul>

            <h3 className="font-bold text-lg mb-4 mt-8">Level</h3>
            <ul className="space-y-2">
              <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-primary focus:ring-primary" /> High School (Lycée)</label></li>
              <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-primary focus:ring-primary" /> University</label></li>
              <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-primary focus:ring-primary" /> Competitive Exams</label></li>
            </ul>
            
            <button className="w-full bg-primary/10 text-primary font-bold py-2 mt-6 rounded hover:bg-primary hover:text-white transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <span className="text-gray-600">Showing {catalogProducts.length} resources</span>
            <select className="border border-gray-300 rounded-md p-2 bg-white outline-none focus:ring-1 focus:ring-primary">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
