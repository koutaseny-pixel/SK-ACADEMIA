import { createClient } from "@/lib/supabase/server";
import {
  DollarSign, ShoppingBag, Users, PackageOpen,
  TrendingUp, TrendingDown, ArrowRight, Clock, CheckCircle
} from "lucide-react";
import Link from "next/link";
import AdminRevenueChart from "@/components/admin/AdminRevenueChart";
import AdminDonutChart from "@/components/admin/AdminDonutChart";

export const metadata = {
  title: "Dashboard Admin | SK Academia",
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  // -- Fetch all orders
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      id, reference, status, created_at, total_amount,
      customer_first_name, customer_last_name, customer_email,
      order_items(id, product_name, quantity, price_at_time, product_id)
    `)
    .order("created_at", { ascending: false });

  // -- Fetch all products
  const { data: products } = await supabase
    .from("products")
    .select("id, name, price, category, is_published, image_url");

  // -- Fetch customer count (distinct user_ids from orders)
  const { count: customerCount } = await supabase
    .from("orders")
    .select("user_id", { count: "exact", head: false });

  // -- Calculate KPIs
  const paidOrders = orders?.filter(o => o.status === "paid") || [];
  const pendingOrders = orders?.filter(o => o.status === "pending") || [];
  const totalRevenue = paidOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
  const totalOrders = orders?.length || 0;
  const publishedProducts = products?.filter(p => p.is_published).length || 0;
  const uniqueCustomers = new Set(orders?.map(o => o.customer_email)).size;

  // -- Build monthly revenue data (last 6 months)
  const now = new Date();
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const label = d.toLocaleDateString("fr-FR", { month: "short" });
    const monthOrders = paidOrders.filter(o => {
      const od = new Date(o.created_at);
      return od.getFullYear() === d.getFullYear() && od.getMonth() === d.getMonth();
    });
    const revenue = monthOrders.reduce((s, o) => s + Number(o.total_amount), 0);
    return { name: label.charAt(0).toUpperCase() + label.slice(1), revenus: revenue, commandes: monthOrders.length };
  });

  // -- Best sellers (aggregate by product_id)
  const salesMap: Record<string, { name: string; count: number; revenue: number }> = {};
  paidOrders.forEach(order => {
    order.order_items?.forEach((item: any) => {
      const key = item.product_id || item.product_name;
      if (!salesMap[key]) {
        salesMap[key] = { name: item.product_name, count: 0, revenue: 0 };
      }
      salesMap[key].count += item.quantity;
      salesMap[key].revenue += item.price_at_time * item.quantity;
    });
  });
  const bestSellers = Object.values(salesMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // -- Category breakdown for donut
  const categoryMap: Record<string, number> = {};
  paidOrders.forEach(order => {
    order.order_items?.forEach((item: any) => {
      const prod = products?.find(p => p.id === item.product_id);
      const cat = prod?.category || "other";
      categoryMap[cat] = (categoryMap[cat] || 0) + item.price_at_time * item.quantity;
    });
  });
  const donutData = Object.entries(categoryMap).map(([name, value]) => ({
    name: name === "prepa" ? "Préparation" : name === "formation" ? "Formation" : name === "ressources" ? "Ressource & E-book" : name,
    value
  }));

  const recentOrders = orders?.slice(0, 6) || [];

  const statCards = [
    {
      title: "Revenus Totaux",
      value: totalRevenue.toLocaleString("fr-SN") + " F",
      sub: `${paidOrders.length} ventes payées`,
      icon: DollarSign,
      color: "from-[#1b508f] to-blue-600",
      positive: true,
    },
    {
      title: "Commandes",
      value: totalOrders.toString(),
      sub: `${pendingOrders.length} en attente de validation`,
      icon: ShoppingBag,
      color: "from-orange-400 to-orange-600",
      positive: pendingOrders.length === 0,
    },
    {
      title: "Clients Uniques",
      value: uniqueCustomers.toString(),
      sub: "Basé sur les emails",
      icon: Users,
      color: "from-purple-500 to-purple-700",
      positive: true,
    },
    {
      title: "Produits Publiés",
      value: publishedProducts.toString(),
      sub: `${(products?.length || 0) - publishedProducts} en brouillon`,
      icon: PackageOpen,
      color: "from-green-500 to-green-700",
      positive: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Vue d'ensemble</h1>
          <p className="text-gray-500 text-sm mt-1">Bienvenue sur votre tableau de bord SK Academia.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/orders" className="inline-flex items-center gap-2 text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-xl transition-all shadow-md shadow-orange-500/20">
            <ShoppingBag size={16} /> Gérer les commandes
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div key={card.title} className={`bg-gradient-to-br ${card.color} text-white rounded-2xl p-5 shadow-lg relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <card.icon size={20} />
            </div>
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">{card.title}</p>
            <p className="text-2xl font-black">{card.value}</p>
            <p className="text-white/60 text-xs mt-2 flex items-center gap-1">
              {card.positive ? <TrendingUp size={12} /> : <Clock size={12} />}
              {card.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdminRevenueChart data={monthlyData} />
        </div>
        <div>
          <AdminDonutChart data={donutData} totalRevenue={totalRevenue} />
        </div>
      </div>

      {/* Best sellers + Recent orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best sellers */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Meilleures ventes</h3>
            <Link href="/admin/products" className="text-xs font-bold text-[#1b508f] hover:underline inline-flex items-center gap-1">
              Voir produits <ArrowRight size={12} />
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {bestSellers.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">Aucune vente enregistrée.</p>
            ) : (
              bestSellers.map((item, idx) => {
                const pct = totalRevenue > 0 ? Math.round((item.revenue / totalRevenue) * 100) : 0;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-800 truncate max-w-[65%]">{item.name}</span>
                      <span className="font-bold text-[#1b508f] shrink-0">{item.revenue.toLocaleString("fr-SN")} F</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#1b508f] to-blue-400 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400">{item.count} unité(s) vendue(s) · {pct}% du CA</p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent sales */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Ventes récentes</h3>
            <Link href="/admin/orders" className="text-xs font-bold text-[#1b508f] hover:underline inline-flex items-center gap-1">
              Toutes les commandes <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">Aucune commande.</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-black text-sm shrink-0">
                    {(order.customer_first_name || order.customer_email || "?").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">
                      {order.customer_first_name} {order.customer_last_name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{order.reference}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-sm text-gray-900">
                      {Number(order.total_amount).toLocaleString("fr-SN")} F
                    </p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                      order.status === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {order.status === "paid" ? <span className="flex items-center gap-0.5"><CheckCircle size={10} /> Payée</span> : "En attente"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
