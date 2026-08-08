import { createClient } from "@/lib/supabase/server";
import { Package, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function OrderHistory() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch all orders with their items
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      id, 
      status, 
      created_at, 
      total_amount,
      order_items (
        product_name,
        quantity,
        price_at_time
      )
    `)
    .eq("customer_email", user?.email)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Historique des commandes</h1>
        <p className="text-gray-600">Retrouvez toutes les commandes que vous avez passées sur SK Academia.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {!orders || orders.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">Vous n'avez pas encore passé de commande. Explorez notre catalogue pour trouver des ressources éducatives.</p>
            <Link href="/catalog" className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Explorer le catalogue
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-50">
                  <div>
                    <h3 className="font-bold text-gray-900">Commande #{order.id.split('-')[0]}</h3>
                    <p className="text-sm text-gray-500">Passée le {new Date(order.created_at).toLocaleDateString('fr-SN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-bold text-gray-900">{Number(order.total_amount).toLocaleString('fr-SN', { style: 'currency', currency: 'XOF' })}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status === 'paid' ? 'Payée' : 'En attente de validation'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.order_items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center text-gray-400">
                          <Package size={18} />
                        </div>
                        <span className="font-medium text-gray-700">{item.product_name} <span className="text-gray-400 text-sm">x{item.quantity}</span></span>
                      </div>
                      <span className="text-gray-600">{Number(item.price_at_time * item.quantity).toLocaleString('fr-SN', { style: 'currency', currency: 'XOF' })}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
