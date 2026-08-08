import { createClient } from "@/lib/supabase/server";
import { CheckCircle2, Download, ShoppingBag, Clock, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Commande confirmée | SK Academia",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const params = await searchParams;
  const ref = params.ref;

  let order: any = null;

  if (ref) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("orders")
      .select("id, reference, status, total_amount, created_at, order_items(product_name, quantity)")
      .eq("reference", ref)
      .single();
    order = data;
  }

  const isPaid = order?.status === "paid";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Top accent bar */}
        <div className={`h-2 w-full ${isPaid ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-orange-400 to-orange-500"}`} />

        <div className="p-8 md:p-12 text-center">
          {/* Icon */}
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ${
            isPaid ? "bg-green-50" : "bg-orange-50"
          }`}>
            {isPaid ? (
              <CheckCircle2 size={52} className="text-green-500" />
            ) : (
              <Clock size={52} className="text-orange-500" />
            )}
          </div>

          {isPaid ? (
            <>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Paiement confirmé !</h1>
              <p className="text-gray-500 text-lg mb-2">Wave a validé votre paiement avec succès.</p>
              <p className="text-green-600 font-bold text-sm mb-8">✓ Vos téléchargements sont maintenant débloqués.</p>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Commande enregistrée !</h1>
              <p className="text-gray-500 text-lg mb-2">Votre paiement Wave est en cours de validation.</p>
              <p className="text-orange-600 font-bold text-sm mb-8">Les téléchargements se débloquent automatiquement dès confirmation.</p>
            </>
          )}

          {/* Order details card */}
          {order && (
            <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Référence</p>
                  <p className="font-black text-gray-900 text-lg">{order.reference}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Montant</p>
                  <p className="font-black text-orange-500 text-lg">
                    {Number(order.total_amount).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                  </p>
                </div>
              </div>

              {order.order_items?.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Produits</p>
                  <ul className="space-y-1">
                    {order.order_items.map((item: any, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1b508f] rounded-full shrink-0" />
                        {item.product_name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={`flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-xl ${
                isPaid ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
              }`}>
                {isPaid ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                {isPaid ? "Payée et confirmée" : "Validation en attente"}
              </div>
            </div>
          )}

          {/* Wave info if still pending */}
          {!isPaid && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8 text-left">
              <Zap size={20} className="text-orange-500 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong>Comment ça marche ?</strong> Wave envoie une notification automatique à notre serveur dès que votre paiement est confirmé. Votre accès est débloqué <strong>instantanément</strong>, sans action de votre part.
              </div>
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/catalog"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 px-6 rounded-xl transition-all"
            >
              <ShoppingBag size={18} />
              Explorer la boutique
            </Link>
            <Link
              href="/dashboard/downloads"
              className="flex-1 flex items-center justify-center gap-2 bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-[#1b508f]/20"
            >
              <Download size={18} />
              Mes téléchargements
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
