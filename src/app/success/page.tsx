import Link from "next/link";
import { CheckCircle, Download } from "lucide-react";

export default function Success() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center flex flex-col items-center">
      <CheckCircle size={80} className="text-green-500 mb-6" />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Thank you for your purchase. Your order has been confirmed and your digital resources are ready.
      </p>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full mb-8 text-left">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Downloads</h2>
        <div className="space-y-4 divide-y divide-gray-100">
          <div className="pt-4 flex justify-between items-center">
            <span className="font-medium">Complete Math Guide for BAC 2026.pdf</span>
            <button className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium bg-primary/10 px-4 py-2 rounded">
              <Download size={18} /> Download
            </button>
          </div>
          <div className="pt-4 flex justify-between items-center">
            <span className="font-medium">Physics Past Papers (2015-2025).pdf</span>
            <button className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium bg-primary/10 px-4 py-2 rounded">
              <Download size={18} /> Download
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Link href="/dashboard" className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-lg transition-colors">
          Go to Dashboard
        </Link>
        <Link href="/catalog" className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
