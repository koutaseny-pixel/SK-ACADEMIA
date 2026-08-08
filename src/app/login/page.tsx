"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type AuthMode = "login" | "signup" | "verify";

export default function Login() {
  const [mode, setMode] = useState<AuthMode>("login");
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
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
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      } else if (mode === "signup") {
        if (password !== confirmPassword) {
          throw new Error("Les mots de passe ne correspondent pas.");
        }
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              phone: phone,
            }
          }
        });
        if (error) throw error;
        // Basculer vers l'écran de vérification OTP
        setMode("verify");
        setMessage("Un code à 6 chiffres a été envoyé à votre adresse email.");
      }
    } catch (err: any) {
      setError(err.message === "Invalid login credentials" 
        ? "Email ou mot de passe incorrect." 
        : err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join("");
    if (token.length !== 6) {
      setError("Veuillez saisir le code complet à 6 chiffres.");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup'
      });
      
      if (error) throw error;
      
      router.push("/dashboard");
    } catch (err: any) {
      setError("Le code est incorrect ou a expiré.");
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

  // Gestion des inputs OTP
  const handleChangeOtp = (index: number, value: string) => {
    if (value.length > 1) value = value[0]; // Empêcher plusieurs caractères
    if (!/^\d*$/.test(value)) return; // Uniquement des chiffres

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus vers la case suivante
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDownOtp = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Côté Gauche : Image / Branding (Caché sur mobile) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#1b508f]">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
          alt="Étudiants"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b508f] via-[#1b508f]/80 to-transparent"></div>
        <div className="absolute inset-0 p-16 flex flex-col justify-end">
          <Link href="/" className="mb-auto">
            <span className="text-3xl font-black tracking-tight text-white leading-none">SK ACADEMIA</span>
          </Link>
          <div className="max-w-md">
            <h2 className="text-4xl font-black text-white mb-6 leading-tight">
              L'excellence académique à portée de clic.
            </h2>
            <p className="text-blue-100 text-lg font-medium leading-relaxed mb-8">
              Rejoignez des milliers d'étudiants qui utilisent nos fascicules, préparations aux concours et formations pour réussir leurs études.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-[#1b508f] flex items-center justify-center text-white text-xs font-bold">10k+</div>
                <img className="w-10 h-10 rounded-full border-2 border-[#1b508f]" src="https://i.pravatar.cc/100?img=1" alt="user" />
                <img className="w-10 h-10 rounded-full border-2 border-[#1b508f]" src="https://i.pravatar.cc/100?img=2" alt="user" />
                <img className="w-10 h-10 rounded-full border-2 border-[#1b508f]" src="https://i.pravatar.cc/100?img=3" alt="user" />
              </div>
              <span className="text-white text-sm font-medium">Rejoignez la communauté</span>
            </div>
          </div>
        </div>
      </div>

      {/* Côté Droit : Formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        <div className="max-w-md w-full">
          
          {/* Logo Mobile */}
          <Link href="/" className="lg:hidden block mb-12 text-center">
            <span className="text-2xl font-black tracking-tight text-[#1b508f] leading-none">SK ACADEMIA</span>
          </Link>

          {/* En-tête du formulaire */}
          <div className="mb-10">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              {mode === "login" && "Bon retour ! 👋"}
              {mode === "signup" && "Créer un compte"}
              {mode === "verify" && "Vérification 🔒"}
            </h1>
            <p className="text-gray-500 font-medium text-sm">
              {mode === "login" && "Renseignez vos identifiants pour accéder à votre espace."}
              {mode === "signup" && "Rejoignez la plateforme éducative numéro 1."}
              {mode === "verify" && "Saisissez le code de sécurité envoyé par mail."}
            </p>
          </div>

          {/* Alertes */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          {message && mode === "verify" && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm font-medium mb-6 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 size={20} className="shrink-0 mt-0.5 text-green-500" />
              <span>{message}</span>
            </div>
          )}

          {/* Formulaire Login / Signup */}
          {mode !== "verify" && (
            <form onSubmit={handleEmailAuth} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
              {mode === "signup" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Prénom</label>
                      <input 
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium bg-gray-50 focus:bg-white" 
                        placeholder="Mamadou" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                      <input 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium bg-gray-50 focus:bg-white" 
                        placeholder="Diop" 
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Numéro de téléphone</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium bg-gray-50 focus:bg-white" 
                      placeholder="+221 77 123 45 67" 
                      required
                    />
                  </div>
                </>
              )}

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
                    className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium bg-gray-50 focus:bg-white" 
                    placeholder="vous@exemple.com" 
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-gray-700">Mot de passe</label>
                  {mode === "login" && (
                    <Link href="/forgot-password" className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">
                      Mot de passe oublié ?
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
                    className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium bg-gray-50 focus:bg-white" 
                    placeholder="••••••••" 
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {mode === "signup" && (
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
                      className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium bg-gray-50 focus:bg-white" 
                      placeholder="••••••••" 
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 flex items-center justify-center gap-2 mt-2 hover:-translate-y-0.5"
              >
                {loading ? "Veuillez patienter..." : (mode === "login" ? "Se connecter" : "S'inscrire")}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          )}

          {/* Formulaire OTP */}
          {mode === "verify" && (
            <form onSubmit={handleVerifyOtp} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    onChange={(e) => handleChangeOtp(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDownOtp(index, e)}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black text-[#1b508f] bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                  />
                ))}
              </div>

              <div className="space-y-3">
                <button 
                  type="submit" 
                  disabled={loading || otp.join("").length !== 6}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  {loading ? "Vérification en cours..." : "Valider le code"}
                </button>

                <button 
                  type="button"
                  onClick={() => setMode("signup")}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} /> Retour à l'inscription
                </button>
              </div>
            </form>
          )}

          {/* Basculer entre Login et Signup */}
          {mode !== "verify" && (
            <>
              <div className="mt-8 text-center text-sm font-medium">
                <span className="text-gray-500">
                  {mode === "login" ? "Nouveau sur SK Academia ?" : "Vous avez déjà un compte ?"}
                </span>
                <button 
                  type="button" 
                  onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setMessage(""); }}
                  className="ml-2 text-[#1b508f] font-black hover:underline transition-all"
                >
                  {mode === "login" ? "Créer un compte" : "Se connecter"}
                </button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400 font-medium uppercase tracking-wider text-xs">Ou continuer avec</span>
                </div>
              </div>

              <button 
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Connexion via Google
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
