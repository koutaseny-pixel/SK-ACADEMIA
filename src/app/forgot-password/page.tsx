"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      
      setMessage("Un email de réinitialisation vous a été envoyé. Veuillez vérifier votre boîte de réception.");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-xl border border-gray-100">
          <Link href="/login" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Retour à la connexion
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              Mot de passe oublié ? 🔒
            </h1>
            <p className="text-gray-500 font-medium text-sm">
              Saisissez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6 flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          {message && (
            <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm font-medium mb-6 flex items-start gap-3">
              <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          {!message && (
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Adresse Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Mail size={20} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium" 
                    placeholder="vous@exemple.com" 
                    required
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Envoi en cours..." : "Envoyer le lien"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
