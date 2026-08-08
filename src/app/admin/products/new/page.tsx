import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/admin/products" 
          className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Retour aux produits
        </Link>
        <h1 className="text-2xl font-black text-gray-900">Créer un nouveau produit</h1>
        <p className="text-gray-500 text-sm mt-1">Remplissez les informations ci-dessous pour ajouter un élément au catalogue.</p>
      </div>

      <ProductForm />
    </div>
  );
}
