"use client";

import Link from "next/link";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // State for the form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const router = useRouter();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getTotal();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Create Supabase client
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      // 2. Insert into orders table
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_first_name: formData.firstName,
          customer_last_name: formData.lastName,
          customer_email: formData.email,
          customer_phone: formData.phone,
          total_amount: subtotal,
          payment_method: 'mobile_money'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 3. Insert order items
      const orderItemsToInsert = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price_at_time: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsToInsert);

      if (itemsError) throw itemsError;

      // 4. Success!
      clearCart();
      setSuccess(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Une erreur s'est produite lors de la validation de la commande. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Commande Confirmée !</h1>
        <p className="text-xl text-gray-600 mb-8">
          Votre commande a bien été enregistrée. Si vous avez choisi le paiement par Mobile Money, veuillez transférer le montant total au numéro suivant : <strong className="text-gray-900">77 000 00 00</strong>.
        </p>
        <Link href="/catalog" className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg transition-colors inline-block">
          Retour au Catalogue
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <p className="text-xl text-gray-600 mb-6">Your cart is empty.</p>
        <Link href="/catalog" className="text-primary hover:underline font-bold">
          Retour au Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    placeholder="Votre prénom" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    placeholder="Votre nom" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  required 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  placeholder="you@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                <input 
                  required 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  placeholder="ex: 77 000 00 00" 
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="border border-primary bg-primary/5 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary h-4 w-4" defaultChecked />
                  <span className="font-medium">Mobile Money (Wave, Orange Money, Free Money)</span>
                </label>
              </div>
            </div>
            
            <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
              <Lock size={16} />
              <span>Payments are processed securely.</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="flex flex-col gap-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 line-clamp-1 flex-1 pr-4">{item.name} (x{item.quantity})</span>
                  <span className="font-medium whitespace-nowrap">{(item.price * item.quantity).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-100 pt-4 space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-900">Total</span>
                <span className="font-bold text-2xl text-primary">{subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Traitement..." : "Confirmer la commande"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
