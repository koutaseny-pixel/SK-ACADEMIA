import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/admin/products" 
          className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Retour aux produits
        </Link>
        <h1 className="text-2xl font-black text-gray-900">Modifier le produit</h1>
        <p className="text-gray-500 text-sm mt-1">Mettez à jour les informations de {product.name}.</p>
      </div>

      <ProductForm initialData={product} />
    </div>
  );
}
