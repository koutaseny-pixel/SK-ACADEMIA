"use client";

import Link from "next/link";
import { Trash2, ArrowRight, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getTotal();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-gray-100">
          <p className="text-xl text-gray-600 mb-6">Your cart is empty.</p>
          <Link href="/catalog" className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg transition-colors inline-block">
            Browse Resources
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
              {items.map(item => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                    {item.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">{item.category}</span>
                    <Link href={`/catalog/${item.id}`} className="hover:text-primary transition-colors block">
                      <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                    </Link>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100" aria-label="Decrease quantity"><Minus size={16} /></button>
                        <span className="px-3 font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100" aria-label="Increase quantity"><Plus size={16} /></button>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-lg text-primary text-center sm:text-right mt-4 sm:mt-0">
                    {(item.price * item.quantity).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 mt-4 sm:mt-0">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">{subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium text-gray-900">Included</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-900">Total</span>
                  <span className="font-bold text-2xl text-primary">{subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
                </div>
              </div>
              
              <Link href="/checkout" className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
