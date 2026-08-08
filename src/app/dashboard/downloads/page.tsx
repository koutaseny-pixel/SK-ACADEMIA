import { createClient } from "@/lib/supabase/server";
import { Download, FileText, Lock } from "lucide-react";

export default async function DownloadsLibrary() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch PAID order items for the user
  const { data: paidOrders } = await supabase
    .from("orders")
    .select(`
      id,
      order_items (
        product_id,
        product_name
      )
    `)
    .eq("customer_email", user?.email)
    .eq("status", "paid");

  // Flatten the items
  const accessibleItems = paidOrders?.flatMap(order => order.order_items) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bibliothèque de téléchargements</h1>
        <p className="text-gray-600">Accédez à tous vos guides et documents achetés.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
        {accessibleItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document débloqué</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Vos documents apparaîtront ici une fois que votre commande aura été validée et payée.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accessibleItems.map((item: any, idx: number) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded flex items-center justify-center shrink-0">
                  <FileText size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1">{item.product_name}</h4>
                  <p className="text-sm text-gray-500 mb-3">Format PDF</p>
                  <button className="flex items-center gap-2 text-primary font-medium text-sm hover:underline">
                    <Download size={16} />
                    Télécharger
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
        <strong>Note :</strong> Le partage de ces documents est strictement interdit. Chaque PDF téléchargé contient une empreinte numérique invisible liée à votre compte.
      </div>
    </div>
  );
}
