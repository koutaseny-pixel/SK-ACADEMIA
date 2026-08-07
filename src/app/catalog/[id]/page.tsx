import { Check, Star } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/ui/AddToCartButton";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Mock features/rating since they are not in the database yet
  const features = [
    "Over 500 practice questions",
    "Detailed step-by-step solutions",
    "Past papers from 2010 to 2024",
    "Printable PDF format"
  ];
  const rating = 4.8;
  const reviews = 124;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">Home</Link> &gt;{" "}
        <Link href="/catalog" className="hover:text-primary">Catalog</Link> &gt;{" "}
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400 overflow-hidden relative">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image_url} alt={product.name} className="object-cover w-full h-full" />
            ) : (
              <span>[Product Image]</span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 flex flex-col">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-gray-600 font-medium">{rating}</span>
            <span className="text-gray-400 text-sm">({reviews} reviews)</span>
          </div>

          <div className="text-4xl font-bold text-primary mb-6">
            {Number(product.price).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
          </div>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            {product.description || "Aucune description fournie pour ce produit."}
          </p>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">What's included:</h3>
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-100 flex gap-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
