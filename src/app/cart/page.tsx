import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";

export default function Cart() {
  const cartItems = [
    { id: "1", title: "Complete Math Guide for BAC 2026", category: "Study Guide", price: 5000, quantity: 1 },
    { id: "2", title: "Physics Past Papers (2015-2025)", category: "Past Papers", price: 3500, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
            {cartItems.map(item => (
              <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0"></div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                </div>
                <div className="font-bold text-lg text-primary">
                  {item.price.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                </div>
                <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">{subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="font-medium text-gray-900">Calculated at checkout</span>
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
    </div>
  );
}
