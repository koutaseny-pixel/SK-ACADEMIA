"use client";

import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck, CreditCard, ChevronLeft } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for the form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const fetchUser = async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setFormData(prev => ({
          ...prev,
          firstName: user.user_metadata?.first_name || "",
          lastName: user.user_metadata?.last_name || "",
          email: user.email || "",
        }));
      }
    };
    
    fetchUser();
  }, []);

  if (!mounted) return null;

  const subtotal = getTotal();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id || null,
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

      clearCart();
      router.push("/success");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Une erreur s'est produite lors de la validation de la commande. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-24 px-4 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
          <CreditCard size={40} className="text-gray-300" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Paiement</h1>
        <p className="text-gray-500 mb-8 text-lg">Votre panier est vide. Vous ne pouvez pas procéder au paiement.</p>
        <Link 
          href="/catalog" 
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-orange-500/20"
        >
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Top Bar Minimaliste */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors">
            <ChevronLeft size={20} />
            Retour au panier
          </Link>
          <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1.5 rounded-full">
            <ShieldCheck size={16} />
            Paiement Sécurisé
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-8">Validation de la commande</h1>
        
        <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Formulaires */}
          <div className="lg:w-3/5 space-y-8">
            
            {/* Informations de contact */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#1b508f]"></div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-50 text-[#1b508f] flex items-center justify-center text-sm">1</span>
                Informations de contact
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Prénom</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#1b508f]/20 focus:border-[#1b508f] transition-all" 
                    placeholder="Ex: Mamadou" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Nom</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#1b508f]/20 focus:border-[#1b508f] transition-all" 
                    placeholder="Ex: Diop" 
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700">Adresse Email</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#1b508f]/20 focus:border-[#1b508f] transition-all" 
                    placeholder="mamadou@example.com (pour l'envoi du document)" 
                  />
                  <p className="text-xs text-gray-500 mt-1">Le document PDF vous sera envoyé sur cette adresse.</p>
                </div>
              </div>
            </div>

            {/* Méthode de paiement */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-sm">2</span>
                Méthode de paiement
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-orange-500 bg-orange-50/50 cursor-pointer">
                  <input type="radio" name="payment" className="mt-1 w-5 h-5 accent-orange-500" defaultChecked />
                  <div className="flex-1">
                    <span className="block font-bold text-gray-900 mb-1">Mobile Money (Wave, Orange, Free)</span>
                    <span className="block text-sm text-gray-500 mb-4">Payez rapidement et en toute sécurité avec votre compte mobile.</span>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700">Numéro de téléphone payeur</label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full border border-gray-300 bg-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-gray-900" 
                        placeholder="Ex: 77 123 45 67" 
                      />
                    </div>
                  </div>
                </label>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 py-3 rounded-lg">
                <Lock size={16} className="text-green-600" />
                <span>Vos transactions sont chiffrées de bout en bout.</span>
              </div>
            </div>
          </div>

          {/* Résumé de la commande */}
          <div className="lg:w-2/5">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif</h3>
              
              <div className="flex flex-col gap-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                       <img 
                          src={item.image_url || "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Qté: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-[#1b508f]">
                      {(item.price * item.quantity).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-6 space-y-4 mb-8">
                <div className="flex justify-between items-center text-gray-600 text-sm">
                  <span>Sous-total</span>
                  <span className="font-medium">{subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total à payer</span>
                  <span className="font-black text-3xl text-orange-500">{subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
              >
                {isSubmitting ? (
                  "Traitement en cours..."
                ) : (
                  <>Payer {subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })} <ArrowRight size={20} /></>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                En confirmant, vous acceptez nos conditions générales de vente.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
