import { DollarSign, ShoppingBag, Users, PackageOpen } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import RevenueChart from "@/components/admin/RevenueChart";

export default function AdminDashboard() {
  const recentOrders = [
    { id: "ORD-001", customer: "Mamadou Diop", date: "Aujourd'hui", amount: 15000, status: "Complété" },
    { id: "ORD-002", customer: "Fatou Sow", date: "Aujourd'hui", amount: 5000, status: "Complété" },
    { id: "ORD-003", customer: "Alioune Ndiaye", date: "Hier", amount: 25000, status: "En attente" },
    { id: "ORD-004", customer: "Awa Fall", date: "Hier", amount: 10000, status: "Complété" },
    { id: "ORD-005", customer: "Ousmane Kane", date: "05 Aout 2026", amount: 7500, status: "Complété" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header text */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Vue d'ensemble</h1>
        <p className="text-gray-500 mt-1">Bienvenue sur votre tableau de bord SK Academia.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Revenus du mois" 
          value="450 000 F" 
          change="12%" 
          isPositive={true} 
          icon={DollarSign} 
        />
        <StatCard 
          title="Ventes (30j)" 
          value="124" 
          change="8.5%" 
          isPositive={true} 
          icon={ShoppingBag} 
        />
        <StatCard 
          title="Nouveaux Clients" 
          value="45" 
          change="3.2%" 
          isPositive={false} 
          icon={Users} 
        />
        <StatCard 
          title="Produits Actifs" 
          value="89" 
          change="5" 
          isPositive={true} 
          icon={PackageOpen} 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Commandes Récentes</h3>
            <button className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">
              Tout voir
            </button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-sm">{order.amount.toLocaleString('fr-SN')} F</p>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full inline-block mt-1
                    ${order.status === 'Complété' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                  `}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
