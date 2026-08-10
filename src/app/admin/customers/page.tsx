import { createClient } from "@/lib/supabase/server";
import { Mail, Phone, ShoppingBag } from "lucide-react";

export default async function AdminCustomersPage() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders for customers:", error);
  }

  // Group orders by customer email to get unique customers
  const customersMap = new Map<string, any>();
  
  if (orders) {
    orders.forEach(order => {
      if (!order.customer_email) return;
      
      if (!customersMap.has(order.customer_email)) {
        customersMap.set(order.customer_email, {
          email: order.customer_email,
          firstName: order.customer_first_name,
          lastName: order.customer_last_name,
          phone: order.customer_phone,
          totalSpent: 0,
          orderCount: 0,
          lastOrderDate: order.created_at,
        });
      }
      
      const customer = customersMap.get(order.customer_email);
      customer.totalSpent += Number(order.total_amount || 0);
      customer.orderCount += 1;
      
      // Update last order date if this order is more recent
      if (new Date(order.created_at) > new Date(customer.lastOrderDate)) {
        customer.lastOrderDate = order.created_at;
      }
    });
  }

  const customers = Array.from(customersMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Clients</h1>
        <p className="text-gray-500 text-sm mt-1">Gérez votre base de données clients et consultez leur historique.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-bold">Client</th>
                <th className="p-4 font-bold">Contact</th>
                <th className="p-4 font-bold text-center">Commandes</th>
                <th className="p-4 font-bold text-right">Total Dépensé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 font-medium">Aucun client pour le moment.</td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{customer.firstName} {customer.lastName}</div>
                      <div className="text-xs text-gray-500 mt-1">Dernière cde: {new Date(customer.lastOrderDate).toLocaleDateString('fr-FR')}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-gray-400" /> {customer.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" /> {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 w-8 h-8 rounded-full font-bold text-sm">
                        {customer.orderCount}
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold text-[#1b508f]">
                      {customer.totalSpent.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
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
