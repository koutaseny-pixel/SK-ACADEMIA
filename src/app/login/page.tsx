"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI states
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const supabase = createClient();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Vérifiez votre boîte mail pour confirmer votre compte !");
      }
    } catch (err: any) {
      setError(err.message === "Invalid login credentials" 
        ? "Email ou mot de passe incorrect." 
        : "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError("La connexion avec Google a échoué.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              {isLogin ? "Bon retour ! 👋" : "Créez votre compte 🚀"}
            </h1>
            <p className="text-gray-500 font-medium text-sm">
              {isLogin ? "Connectez-vous pour accéder à vos documents." : "Rejoignez la plateforme éducative #1 au Sénégal."}
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

          <form onSubmit={handleEmailAuth} className="space-y-5">
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
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-gray-700">Mot de passe</label>
                {isLogin && (
                  <Link href="/forgot-password" className="text-sm font-bold text-orange-500 hover:text-orange-600">
                    Oublié ?
                  </Link>
                )}
              </div>
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

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Veuillez patienter..." : (isLogin ? "Se connecter" : "S'inscrire")}
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-medium">
            <span className="text-gray-500">
              {isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
            </span>
            <button 
              type="button" 
              onClick={() => { setIsLogin(!isLogin); setError(""); setMessage(""); }}
              className="ml-2 text-orange-500 font-bold hover:underline"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400 font-medium">Ou continuer avec</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
