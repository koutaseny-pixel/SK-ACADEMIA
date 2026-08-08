import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  async function deleteProduct(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const supabase = await createClient();
    await supabase.from("products").delete().eq("id", id);
    revalidatePath("/admin/products");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Produits</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez votre catalogue de fascicules et formations.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} /> Nouveau Produit
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-bold text-gray-600 text-sm">Produit</th>
                <th className="p-4 font-bold text-gray-600 text-sm">Catégorie</th>
                <th className="p-4 font-bold text-gray-600 text-sm">Prix</th>
                <th className="p-4 font-bold text-gray-600 text-sm text-center">Statut</th>
                <th className="p-4 font-bold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-red-500">Erreur de chargement.</td>
                </tr>
              ) : products?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Aucun produit trouvé.</td>
                </tr>
              ) : (
                products?.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Sans img</div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{product.badge || "Aucun badge"}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{product.category}</span>
                    </td>
                    <td className="p-4 font-bold text-[#1b508f]">
                      {Number(product.price).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                    </td>
                    <td className="p-4 text-center">
                      {product.is_published ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold">
                          <CheckCircle size={12} /> Publié
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                          <XCircle size={12} /> Brouillon
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/products/${product.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit size={18} />
                        </Link>
                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={product.id} />
                          <button 
                            type="submit"
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                            onClick={(e) => {
                              if(!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) e.preventDefault();
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
