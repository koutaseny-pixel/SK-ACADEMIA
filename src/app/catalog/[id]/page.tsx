import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, FileText, Download, ShieldCheck, CheckCircle2 } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import ProductCard from "@/components/ui/ProductCard";

export default async function ProductDetail({ params }: { params: { id: string } }) {
  // Wait for params to be resolved properly in Next.js 16/Next 15+ async params
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

  // Fetch related products (same category, not this product, limited to 3)
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .eq('is_published', true)
    .neq('id', product.id)
    .limit(3);

  // Fallback image based on category
  const defaultImage = product.category?.toLowerCase().includes("informatique") 
    ? "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    : "https://images.unsplash.com/photo-1571260894064-6e13d8e5d790?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  // Dynamic colors for categories
  const getCategoryColor = (name: string, category: string) => {
    const lowerName = name?.toLowerCase() || "";
    if (lowerName.includes("ena")) return "bg-blue-600";
    if (lowerName.includes("douane")) return "bg-yellow-600";
    if (lowerName.includes("police")) return "bg-red-600";
    if (lowerName.includes("gendarmerie")) return "bg-green-700";
    if (lowerName.includes("fastef")) return "bg-purple-600";
    
    if (category?.toLowerCase() === "formation") return "bg-indigo-600";
    if (category?.toLowerCase() === "ressources") return "bg-teal-600";
    return "bg-orange-500";
  };

  const badgeColorClass = getCategoryColor(product.name, product.category);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 font-medium transition-colors">
            <ChevronLeft size={20} />
            Retour au catalogue
          </Link>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row">
          
          {/* Product Image Section */}
          <div className="w-full md:w-1/2 bg-gray-100 relative min-h-[300px] md:min-h-0">
            <img 
              src={product.image_url || defaultImage} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Product Info Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className={`inline-block w-fit text-xs font-bold text-white px-3 py-1 rounded-full uppercase tracking-wider mb-4 ${badgeColorClass}`}>
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
              {product.name}
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description || "Ce document complet vous fournira toutes les connaissances nécessaires pour exceller dans votre domaine. Téléchargement immédiat après paiement."}
            </p>

            <div className="text-5xl font-black text-[#1b508f] mb-8 tracking-tight">
              {product.price.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
            </div>

            <AddToCartButton product={product} />

            {/* Reassurance */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Download className="text-[#1b508f]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Téléchargement instantané</h4>
                  <p className="text-xs text-gray-500 mt-1">Accédez à votre fichier PDF juste après le paiement.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-green-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Paiement 100% Sécurisé</h4>
                  <p className="text-xs text-gray-500 mt-1">Transactions protégées par Wave et Orange Money.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <FileText className="text-orange-500" size={28} />
            Ce que contient ce fascicule
          </h2>
          <ul className="space-y-4">
            {[
              "Cours détaillés et mis à jour selon le dernier programme officiel.",
              "Exercices pratiques avec corrigés pas à pas.",
              "Annales des années précédentes pour s'entraîner.",
              "Astuces et méthodologies pour gagner des points le jour J."
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-black text-gray-900 mb-8">Produits Similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <div key={p.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                  {/* We can't easily import ProductCard because it's a client component and this is a server component? 
                      Actually we can import client components in server components! */}
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
