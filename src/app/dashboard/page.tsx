import { createClient } from "@/lib/supabase/server";
import { BookOpen, ShoppingBag, Download, ArrowRight, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Mon Tableau de Bord | SK Academia",
  description: "Gérez vos achats, téléchargements et informations personnelles.",
};

export default async function DashboardOverview() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch orders by user_id
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      id, reference, status, created_at, total_amount,
      order_items(id, product_name, quantity, price_at_time, product_id)
    `)
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  const totalOrders = orders?.length || 0;
  const paidOrders = orders?.filter(o => o.status === "paid") || [];
  const pendingOrders = orders?.filter(o => o.status === "pending") || [];
  const totalPurchasedProducts = paidOrders.flatMap(o => o.order_items).length;
  const recentOrders = orders?.slice(0, 3) || [];

  // Fetch download count
  const { count: downloadCount } = await supabase
    .from("product_downloads")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id);

  const displayName = user?.user_metadata?.first_name
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`.trim()
    : user?.email?.split("@")[0] || "Étudiant";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1b508f] to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 text-2xl font-black">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl md:text-3xl font-black mb-1">Bonjour, {displayName} 👋</h1>
          <p className="text-blue-100 text-sm">Bienvenue dans votre espace étudiant SK Academia.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/catalog" className="inline-flex items-center gap-2 bg-white text-[#1b508f] font-bold text-sm py-2 px-4 rounded-xl hover:bg-blue-50 transition-colors">
              <ShoppingBag size={16} /> Explorer la boutique
            </Link>
            <Link href="/dashboard/downloads" className="inline-flex items-center gap-2 bg-white/20 text-white font-bold text-sm py-2 px-4 rounded-xl hover:bg-white/30 transition-colors">
              <Download size={16} /> Mes téléchargements
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Commandes", value: totalOrders, icon: ShoppingBag, color: "blue" },
          { label: "Payées", value: paidOrders.length, icon: CheckCircle, color: "green" },
          { label: "Ressources", value: totalPurchasedProducts, icon: BookOpen, color: "purple" },
          { label: "Téléchargements", value: downloadCount || 0, icon: Download, color: "orange" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3
              ${stat.color === "blue" ? "bg-blue-50 text-[#1b508f]" : ""}
              ${stat.color === "green" ? "bg-green-50 text-green-600" : ""}
              ${stat.color === "purple" ? "bg-purple-50 text-purple-600" : ""}
              ${stat.color === "orange" ? "bg-orange-50 text-orange-500" : ""}
            `}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Commandes récentes</h2>
            <Link href="/dashboard/orders" className="text-[#1b508f] hover:underline text-sm font-medium inline-flex items-center gap-1">
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12 px-6">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={28} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium mb-3">Vous n'avez pas encore passé de commande.</p>
              <Link href="/catalog" className="text-[#1b508f] hover:underline text-sm font-bold">
                Explorer le catalogue →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-5 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                  <div>
                    <p className="font-bold text-gray-900">{order.reference}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {order.order_items?.map((item: any, idx: number) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {item.product_name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-black text-[#1b508f]">
                      {Number(order.total_amount).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                    </p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-bold rounded-full ${
                      order.status === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {order.status === "paid" ? "✓ Payée" : "⏳ En attente"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          {pendingOrders.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-orange-800 text-sm">
                    {pendingOrders.length} commande(s) en attente
                  </p>
                  <p className="text-orange-700 text-xs mt-1">
                    Vos paiements Mobile Money sont en cours de validation. Vous serez notifié dès confirmation.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Accès rapide</h3>
            {[
              { href: "/dashboard/downloads", label: "Mes téléchargements", icon: Download, color: "text-purple-600 bg-purple-50" },
              { href: "/dashboard/orders", label: "Historique des commandes", icon: ShoppingBag, color: "text-blue-600 bg-blue-50" },
              { href: "/dashboard/settings", label: "Mon profil", icon: BookOpen, color: "text-green-600 bg-green-50" },
              { href: "/catalog", label: "Boutique SK Academia", icon: ArrowRight, color: "text-orange-600 bg-orange-50" },
            ].map(link => (
              <Link key={link.href} href={link.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${link.color}`}>
                  <link.icon size={18} />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{link.label}</span>
                <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-gray-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
