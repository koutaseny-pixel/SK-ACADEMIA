import { createClient } from "@/lib/supabase/server";
import { BookOpen, ShoppingBag, Clock } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch some summary data for the user (orders count, etc.)
  // We filter orders by customer_email (since user is logged in with that email)
  const { data: orders } = await supabase
    .from("orders")
    .select("id, status, created_at, total_amount")
    .eq("customer_email", user?.email)
    .order("created_at", { ascending: false });

  const totalOrders = orders?.length || 0;
  const recentOrders = orders?.slice(0, 3) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bonjour ! 👋</h1>
        <p className="text-gray-600 text-lg">Bienvenue dans votre espace étudiant SK Academia.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Commandes passées</p>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center shrink-0">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Ressources débloquées</p>
            <p className="text-2xl font-bold text-gray-900">--</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-accent rounded-lg flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Temps de lecture</p>
            <p className="text-2xl font-bold text-gray-900">0h</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Commandes récentes</h2>
          <Link href="/dashboard/orders" className="text-primary hover:underline text-sm font-medium">Voir tout</Link>
        </div>
        
        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Vous n'avez pas encore passé de commande.</p>
            <Link href="/catalog" className="text-primary hover:underline mt-2 inline-block">Explorer le catalogue</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Commande #{order.id.split('-')[0]}</p>
                  <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString('fr-SN')}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{Number(order.total_amount).toLocaleString('fr-SN', { style: 'currency', currency: 'XOF' })}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                    order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status === 'paid' ? 'Payée' : 'En attente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
