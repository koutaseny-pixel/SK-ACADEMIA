"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Check, Clock, X, ChevronDown, ChevronUp } from "lucide-react";

type OrderItem = {
  id: string;
  product_name: string;
  quantity: number;
  price_at_time: number;
};

type Order = {
  id: string;
  reference: string;
  created_at: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  status: string;
  payment_method: string;
  order_items: OrderItem[];
};

export default function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const supabase = createClient();

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Erreur lors de la mise à jour du statut.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200"><Check size={14} /> Payée</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200"><X size={14} /> Annulée</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200"><Clock size={14} /> En attente</span>;
    }
  };

  if (orders.length === 0) {
    return <div className="p-8 text-center text-gray-500 font-medium">Aucune commande pour le moment.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
            <th className="p-4 font-bold">Réf & Date</th>
            <th className="p-4 font-bold">Client</th>
            <th className="p-4 font-bold">Montant</th>
            <th className="p-4 font-bold">Statut</th>
            <th className="p-4 font-bold">Action</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map(order => (
            <React.Fragment key={order.id}>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-gray-900">{order.reference}</div>
                  <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-gray-900">{order.customer_first_name} {order.customer_last_name}</div>
                  <div className="text-xs text-gray-500">{order.customer_phone}</div>
                </td>
                <td className="p-4 font-bold text-[#1b508f]">
                  {order.total_amount.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                </td>
                <td className="p-4">
                  {getStatusBadge(order.status)}
                </td>
                <td className="p-4">
                  {order.status === 'pending' && (
                    <button 
                      onClick={() => updateStatus(order.id, 'paid')}
                      disabled={updatingId === order.id}
                      className="text-xs bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 px-3 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {updatingId === order.id ? '...' : 'Valider'}
                    </button>
                  )}
                  {order.status === 'paid' && (
                    <span className="text-xs text-gray-400 font-medium italic">Traitée</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                    className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {expandedOrderId === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </td>
              </tr>
              {/* Détails de la commande */}
              {expandedOrderId === order.id && (
                <tr className="bg-gray-50/50">
                  <td colSpan={6} className="p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Informations Client</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p><span className="font-medium">Email :</span> {order.customer_email}</p>
                          <p><span className="font-medium">Téléphone :</span> {order.customer_phone}</p>
                          <p><span className="font-medium">Méthode :</span> {order.payment_method === 'mobile_money' ? 'Wave/Orange Money' : order.payment_method}</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Articles Commandés</h4>
                        <ul className="space-y-3">
                          {order.order_items.map(item => (
                            <li key={item.id} className="flex justify-between items-center text-sm border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                              <div>
                                <span className="font-bold text-gray-900">{item.product_name}</span>
                                <span className="text-gray-500 ml-2">x{item.quantity}</span>
                              </div>
                              <span className="font-medium text-gray-700">{(item.price_at_time * item.quantity).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
