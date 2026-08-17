import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  const getCategoryTheme = (name: string, category: string) => {
    const lowerName = name?.toLowerCase() || "";
    if (lowerName.includes("ena")) return { bg: "bg-[#00288e]", text: "text-[#00288e]", light: "bg-[#00288e]/10" };
    if (lowerName.includes("douane")) return { bg: "bg-[#ba1a1a]", text: "text-[#ba1a1a]", light: "bg-[#ba1a1a]/10" };
    if (lowerName.includes("police")) return { bg: "bg-[#7f3500]", text: "text-[#7f3500]", light: "bg-[#7f3500]/10" };
    
    if (category?.toLowerCase() === "formation") return { bg: "bg-[#0058be]", text: "text-[#0058be]", light: "bg-[#0058be]/10" };
    if (category?.toLowerCase() === "ressources") return { bg: "bg-[#3755c3]", text: "text-[#3755c3]", light: "bg-[#3755c3]/10" };
    return { bg: "bg-[#00288e]", text: "text-[#00288e]", light: "bg-[#00288e]/10" };
  };

  const theme = getCategoryTheme(product.name, product.category);

  return (
    <div className="bg-surface text-on-background min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="bg-surface-dim border-b border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-4">
          <Link href="/catalog" className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Retour au catalogue
          </Link>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="glass-panel rounded-[32px] overflow-hidden flex flex-col lg:flex-row">
          
          {/* Product Image Section */}
          <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[500px] bg-surface-container">
            <img 
              src={product.image_url || defaultImage} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80 lg:to-surface hidden lg:block"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent lg:hidden"></div>
          </div>

          {/* Product Info Section */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 bg-surface lg:bg-transparent">
            <span className={`inline-block w-fit font-caption text-caption font-bold px-3 py-1.5 rounded-lg tracking-wider mb-6 ${theme.bg} text-white shadow-sm`}>
              {product.category}
            </span>
            
            <h1 className="font-display text-headline-lg lg:text-[48px] font-bold text-on-background leading-tight mb-6 tracking-tight">
              {product.name}
            </h1>
            
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed max-w-xl">
              {product.description || "Ce document complet vous fournira toutes les connaissances nécessaires pour exceller dans votre domaine. Téléchargement immédiat après paiement."}
            </p>

            <div className="font-display text-[40px] font-bold text-primary mb-8 tracking-tight">
              {Number(product.price).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
            </div>

            <AddToCartButton product={product} />

            {product.preview_url && (
              <a 
                href={product.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full md:w-auto font-label-md text-label-md py-4 px-8 rounded-xl bg-surface border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">visibility</span>
                Regarder un aperçu avant d'acheter
              </a>
            )}

            {/* Reassurance */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-outline-variant/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>download</span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-on-background">Téléchargement instantané</h4>
                  <p className="font-caption text-caption text-on-surface-variant mt-1">Accédez à votre fichier juste après le paiement.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1b5e20]/10 flex items-center justify-center shrink-0 text-[#1b5e20]">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-on-background">Paiement 100% Sécurisé</h4>
                  <p className="font-caption text-caption text-on-surface-variant mt-1">Transactions protégées par Wave et Orange Money.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="mt-16 glass-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="font-display text-[28px] font-bold text-on-background mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[32px]" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
            Ce que contient ce fascicule
          </h2>
          <ul className="space-y-4">
            {[
              "Cours détaillés et mis à jour selon le dernier programme officiel.",
              "Exercices pratiques avec corrigés pas à pas.",
              "Annales des années précédentes pour s'entraîner.",
              "Astuces et méthodologies pour gagner des points le jour J."
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 bg-surface-dim/30 p-4 rounded-2xl">
                <span className="material-symbols-outlined text-[#1b5e20] shrink-0 mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                <span className="font-body-md text-body-md text-on-surface">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-headline-lg font-bold text-on-background mb-8">Produits Similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
