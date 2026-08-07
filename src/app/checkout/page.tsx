import Link from "next/link";
import { Lock } from "lucide-react";

export default function Checkout() {
  const subtotal = 8500;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="you@example.com" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary h-4 w-4" defaultChecked />
                  <span className="font-medium">Mobile Money (Wave, Orange Money)</span>
                </label>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary h-4 w-4" />
                  <span className="font-medium">Credit Card (Stripe)</span>
                </label>
              </div>
            </div>
            
            <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
              <Lock size={16} />
              <span>Payments are secure and encrypted.</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Complete Math Guide (x1)</span>
                <span className="font-medium">5 000 FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Physics Past Papers (x1)</span>
                <span className="font-medium">3 500 FCFA</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4 space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-900">Total</span>
                <span className="font-bold text-2xl text-primary">{subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
              </div>
            </div>
            
            <Link href="/success" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center">
              Complete Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
