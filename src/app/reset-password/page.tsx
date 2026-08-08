"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  const supabase = createClient();

  // Supabase Auth handles the #access_token automatically in the URL hash
  // If the token is valid, the user will be logged in with a recovery session.

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      if (error) throw error;
      
      setMessage("Votre mot de passe a été mis à jour avec succès !");
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Impossible de mettre à jour le mot de passe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              Nouveau mot de passe 🔐
            </h1>
            <p className="text-gray-500 font-medium text-sm">
              Veuillez saisir votre nouveau mot de passe ci-dessous.
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
            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nouveau mot de passe</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium" 
                    placeholder="••••••••" 
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirmer le mot de passe</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium" 
                    placeholder="••••••••" 
                    required
                    minLength={6}
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Mise à jour..." : "Enregistrer le mot de passe"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
