"use client";

import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck, CreditCard, ChevronLeft, Loader2, Zap } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

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
    
    // Show payment failed error from PayTech redirect
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "payment_cancelled") {
      setError("Le paiement a été annulé. Veuillez réessayer.");
    }
  }, []);

  if (!mounted) return null;

  const subtotal = getTotal();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Call our secure server-side CinetPay initiation route
      const response = await fetch("/api/payment/cinetpay/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'initialisation du paiement.");
      }

      const { redirect_url } = data;

      // Clear cart before redirecting to CinetPay
      clearCart();

      // Redirect to CinetPay payment page
      window.location.href = redirect_url;

    } catch (err: any) {
      console.error("Payment initiation error:", err);
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
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
          className="inline-flex items-center gap-2 bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg"
        >
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors">
            <ChevronLeft size={20} />
            Retour au panier
          </Link>
          <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1.5 rounded-full">
            <ShieldCheck size={16} />
            Paiement 100% Sécurisé
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">Validation de la commande</h1>
        <p className="text-gray-500 mb-8">Renseignez vos informations, puis vous serez redirigé vers le paiement sécurisé.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 font-medium px-5 py-4 rounded-2xl mb-6 flex items-start gap-3">
            <span className="text-red-500 text-lg">⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Forms */}
          <div className="lg:w-3/5 space-y-6">

            {/* Contact info */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#1b508f]" />
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-50 text-[#1b508f] flex items-center justify-center text-sm font-black">1</span>
                Informations de contact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Prénom *</label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#1b508f]/20 focus:border-[#1b508f] transition-all"
                    placeholder="Mamadou"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nom *</label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#1b508f]/20 focus:border-[#1b508f] transition-all"
                    placeholder="Diop"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Adresse Email *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#1b508f]/20 focus:border-[#1b508f] transition-all"
                    placeholder="mamadou@example.com"
                  />
                  <p className="text-xs text-gray-400 mt-1">Vos documents seront liés à cette adresse.</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Téléphone (optionnel)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#1b508f]/20 focus:border-[#1b508f] transition-all"
                    placeholder="77 000 00 00"
                  />
                </div>
              </div>
            </div>

            {/* Payment method — CinetPay */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#1b508f]" />
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-50 text-[#1b508f] flex items-center justify-center text-sm font-black">2</span>
                Méthode de paiement
              </h2>

              {/* CinetPay option */}
              <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-[#1b508f] bg-gradient-to-br from-blue-50 to-white">
                <div className="w-12 h-12 bg-[#1b508f] rounded-xl flex items-center justify-center shrink-0">
                  <CreditCard size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-black text-gray-900 mb-0.5">Mobile Money & Carte (CinetPay)</p>
                  <p className="text-sm text-gray-600 mb-3">
                    Payez avec Orange Money, Wave, Free Money ou par Carte Bancaire via CinetPay.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4 items-center">
                    <div className="h-8 bg-white rounded-md p-1 shadow-sm border border-gray-100 flex items-center justify-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1024px-Orange_logo.svg.png" alt="Orange Money" className="h-6 w-auto object-contain" />
                      <span className="text-xs font-bold text-orange-500 ml-1">Money</span>
                    </div>
                    <div className="h-8 bg-[#1dc0ed] rounded-md p-1 px-2 shadow-sm border border-gray-100 flex items-center justify-center">
                      <span className="text-white font-black text-sm tracking-tighter">wave</span>
                    </div>
                    <div className="h-8 bg-white rounded-md p-1 px-2 shadow-sm border border-gray-100 flex items-center justify-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Logo_Free_S%C3%A9n%C3%A9gal.svg/512px-Logo_Free_S%C3%A9n%C3%A9gal.svg.png" alt="Free Money" className="h-4 w-auto object-contain" />
                    </div>
                    <div className="h-8 bg-white rounded-md p-1 px-2 shadow-sm border border-gray-100 flex items-center justify-center gap-1">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/512px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 w-auto object-contain" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/512px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 w-auto object-contain ml-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 py-3 rounded-xl">
                <Lock size={14} className="text-green-600" />
                <span>Transactions chiffrées SSL · Aucune donnée bancaire stockée</span>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:w-2/5">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif</h3>

              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 bg-gray-100 rounded-xl shrink-0 overflow-hidden">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-blue-100 flex items-center justify-center text-[#1b508f] font-black text-lg">
                          {item.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Qté: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-[#1b508f] text-sm shrink-0">
                      {(item.price * item.quantity).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-5 space-y-3 mb-6">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Sous-total</span>
                  <span>{subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Frais</span>
                  <span className="text-green-600 font-bold">Gratuit</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="font-black text-gray-900">Total</span>
                  <span className="font-black text-2xl text-[#1b508f]">
                    {subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1b508f] hover:bg-blue-800 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg shadow-[#1b508f]/20 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    Redirection sécurisée...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    Payer {subtotal.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                En continuant, vous acceptez nos{" "}
                <Link href="/faq" className="underline hover:text-gray-600">conditions générales</Link>.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
