import { createClient } from "@/lib/supabase/server";
import OrdersTable from "@/components/admin/OrdersTable";

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Gestion des Commandes</h1>
        <p className="text-gray-500 text-sm mt-1">Gérez le statut des commandes et validez les paiements Mobile Money.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <OrdersTable initialOrders={orders || []} />
      </div>
    </div>
  );
}
