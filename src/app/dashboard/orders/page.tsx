import { createClient } from "@/lib/supabase/server";
import { Package, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Mes Commandes | SK Academia",
};

export default async function OrderHistory() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      id, 
      reference,
      status, 
      created_at, 
      total_amount,
      order_items (
        id,
        product_name,
        quantity,
        price_at_time
      )
    `)
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  const paid = orders?.filter(o => o.status === "paid").length || 0;
  const pending = orders?.filter(o => o.status === "pending").length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Historique des commandes</h1>
        <p className="text-gray-500 text-sm mt-1">
          {orders?.length || 0} commande(s) — {paid} payée(s), {pending} en attente
        </p>
      </div>

      {/* Summary badges */}
      {orders && orders.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-bold px-4 py-2 rounded-xl">
            <CheckCircle size={16} /> {paid} Payée(s)
          </div>
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-sm font-bold px-4 py-2 rounded-xl">
            <Clock size={16} /> {pending} En attente
          </div>
        </div>
      )}

      <div className="space-y-4">
        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-16 px-6">
            <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Aucune commande</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
              Vous n'avez pas encore passé de commande. Explorez notre catalogue pour trouver des ressources éducatives.
            </p>
            <Link href="/catalog" className="inline-flex items-center gap-2 bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md">
              Explorer le catalogue <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Order header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-gray-50">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-black text-gray-900">{order.reference}</h3>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {order.status === "paid" ? <><CheckCircle size={12} /> Payée</> : <><Clock size={12} /> En attente</>}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Passée le {new Date(order.created_at).toLocaleDateString("fr-FR", {
                      day: "2-digit", month: "long", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="font-black text-xl text-[#1b508f]">
                    {Number(order.total_amount).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                  </p>
                </div>
              </div>

              {/* Order items */}
              <div className="p-5 space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Articles</p>
                {order.order_items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                        <Package size={16} className="text-[#1b508f]" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800 text-sm">{item.product_name}</span>
                        {item.quantity > 1 && (
                          <span className="text-gray-400 text-xs ml-2">×{item.quantity}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      {Number(item.price_at_time * item.quantity).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                    </span>
                  </div>
                ))}

                {order.status === "paid" && (
                  <div className="pt-2">
                    <Link
                      href="/dashboard/downloads"
                      className="inline-flex items-center gap-2 text-[#1b508f] text-sm font-bold hover:underline"
                    >
                      Accéder à mes téléchargements <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
                {order.status === "pending" && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mt-2 text-xs text-orange-700">
                    <strong>En attente de validation :</strong> Votre paiement Mobile Money est en cours de vérification. Vous recevrez vos fichiers dès confirmation.
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
