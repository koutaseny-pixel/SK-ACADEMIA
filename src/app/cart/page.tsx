"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { Trash2, ArrowRight, ShoppingBag, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-8">Votre Panier</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h2>
            <p className="text-gray-500 mb-8 text-lg">Découvrez nos fascicules et formations pour commencer votre apprentissage.</p>
            <Link 
              href="/catalog" 
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-1"
            >
              Parcourir le catalogue <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-bold text-gray-900 text-lg">Articles ({items.length})</h2>
                  <button onClick={clearCart} className="text-sm font-medium text-red-500 hover:text-red-600 hover:underline">
                    Vider le panier
                  </button>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      
                      {/* Image Placeholder */}
                      <div className="w-24 h-24 bg-gray-100 rounded-xl shrink-0 overflow-hidden">
                        <img 
                          src={item.image_url || "https://images.unsplash.com/photo-1571260894064-6e13d8e5d790?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <span className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1 block">
                          {item.category}
                        </span>
                        <Link href={`/catalog/${item.id}`} className="hover:text-orange-500 transition-colors">
                          <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">{item.name}</h3>
                        </Link>
                        <div className="font-black text-[#1b508f]">
                          {item.price.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                        {/* Quantity (Mock for digital products, usually quantity is 1, but let's keep it functional) */}
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Résumé de la commande</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span className="font-medium">{subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span className="font-medium text-green-500">Incluses</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-900">Total</span>
                    <span className="font-black text-3xl text-orange-500">
                      {subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 text-right mt-1">Payable en FCFA</p>
                </div>
                
                <Link 
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-1 text-lg"
                >
                  Passer à la caisse <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
