"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
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
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // Check if user is admin for redirection
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          if (profile?.role === 'admin') {
            router.push("/admin");
            return;
          }
        }

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
    <div className="min-h-screen flex bg-surface">
      {/* Left Side: Branding/Image (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-primary">
        <img
          src="https://images.unsplash.com/photo-1571260894064-6e13d8e5d790?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
          alt="Étudiants Africains"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        <div className="absolute inset-0 p-16 flex flex-col justify-end">
          <Link href="/" className="mb-auto flex items-center gap-3 text-on-primary group">
             <div className="w-12 h-12 rounded-xl bg-surface/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-95 transition-transform duration-300">
              <span className="material-symbols-outlined text-[28px]" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
            </div>
            <span className="font-display text-headline-lg font-bold tracking-tight">SK ACADEMIA</span>
          </Link>
          <div className="max-w-md">
            <h2 className="font-display text-[40px] font-bold text-on-primary mb-6 leading-tight">
              L'excellence académique à portée de clic.
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim opacity-90 leading-relaxed mb-8">
              Rejoignez des milliers d'étudiants qui utilisent nos fascicules, préparations aux concours et formations pour réussir leurs études.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-secondary border-2 border-primary flex items-center justify-center text-on-secondary font-label-md text-[10px] font-bold z-10">10k+</div>
                <img className="w-10 h-10 rounded-full border-2 border-primary relative z-[9]" src="https://i.pravatar.cc/100?img=1" alt="user" />
                <img className="w-10 h-10 rounded-full border-2 border-primary relative z-[8]" src="https://i.pravatar.cc/100?img=2" alt="user" />
                <img className="w-10 h-10 rounded-full border-2 border-primary relative z-[7]" src="https://i.pravatar.cc/100?img=3" alt="user" />
              </div>
              <span className="font-label-md text-label-md text-primary-fixed-dim">Rejoignez la communauté</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        <div className="max-w-md w-full">

          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center justify-center gap-3 mb-12 group">
             <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-95 transition-transform duration-300">
              <span className="material-symbols-outlined text-[24px]" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
            </div>
            <span className="font-display text-headline-md font-bold text-primary tracking-tight">SK ACADEMIA</span>
          </Link>

          {/* Header */}
          <div className="mb-10">
            <h1 className="font-display text-[32px] font-bold text-on-background tracking-tight mb-2">
              {mode === "login" && "Bon retour ! 👋"}
              {mode === "signup" && "Créer un compte"}
              {mode === "verify" && "Vérification 🔒"}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {mode === "login" && "Renseignez vos identifiants pour accéder à votre espace."}
              {mode === "signup" && "Rejoignez la plateforme éducative numéro 1."}
              {mode === "verify" && "Saisissez le code de sécurité envoyé par mail."}
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="bg-error-container text-on-error-container p-4 rounded-xl text-sm font-medium mb-6 flex items-start gap-3 border border-error/20">
              <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">error</span>
              <span>{error}</span>
            </div>
          )}

          {message && mode === "verify" && (
            <div className="bg-[#1b5e20]/10 border border-[#1b5e20]/20 text-[#1b5e20] p-4 rounded-xl text-sm font-medium mb-6 flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span>{message}</span>
            </div>
          )}

          {/* Form */}
          {mode !== "verify" && (
            <form onSubmit={handleEmailAuth} className="space-y-5">
              {mode === "signup" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-md text-label-md font-bold text-on-background mb-2">Prénom</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-outline-variant rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface bg-surface-container-lowest focus:bg-white font-body-md text-body-md"
                        placeholder="Mamadou"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md font-bold text-on-background mb-2">Nom</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-outline-variant rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface bg-surface-container-lowest focus:bg-white font-body-md text-body-md"
                        placeholder="Diop"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md font-bold text-on-background mb-2">Numéro de téléphone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-outline-variant rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface bg-surface-container-lowest focus:bg-white font-body-md text-body-md"
                      placeholder="+221 77 123 45 67"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block font-label-md text-label-md font-bold text-on-background mb-2">Adresse Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-outline-variant rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface bg-surface-container-lowest focus:bg-white font-body-md text-body-md"
                    placeholder="vous@exemple.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-label-md text-label-md font-bold text-on-background">Mot de passe</label>
                  {mode === "login" && (
                    <Link href="/forgot-password" className="font-label-md text-label-md font-bold text-secondary hover:text-primary transition-colors">
                      Mot de passe oublié ?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
                     <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-outline-variant rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface bg-surface-container-lowest focus:bg-white font-body-md text-body-md"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {mode === "signup" && (
                <div>
                  <label className="block font-label-md text-label-md font-bold text-on-background mb-2">Confirmer le mot de passe</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
                       <span className="material-symbols-outlined text-[20px]">lock</span>
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-outline-variant rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface bg-surface-container-lowest focus:bg-white font-body-md text-body-md"
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
                className="w-full bg-primary hover:bg-primary-hover text-on-primary font-label-md text-label-md py-4 px-6 rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 mt-4 hover:-translate-y-0.5 active:scale-95"
              >
                {loading ? "Veuillez patienter..." : (mode === "login" ? "Se connecter" : "S'inscrire")}
                {!loading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
              </button>
            </form>
          )}

          {/* OTP Form */}
          {mode === "verify" && (
            <form onSubmit={handleVerifyOtp} className="space-y-8">
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
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center font-display text-[24px] font-bold text-primary bg-surface-container-lowest border-2 border-outline-variant rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  />
                ))}
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading || otp.join("").length !== 6}
                  className="w-full bg-primary hover:bg-primary-hover text-on-primary font-label-md text-label-md py-4 px-6 rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95"
                >
                  {loading ? "Vérification en cours..." : "Valider le code"}
                </button>

                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="w-full bg-surface-container hover:bg-surface-variant text-on-surface-variant font-label-md text-label-md py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                   <span className="material-symbols-outlined text-[20px]">arrow_back</span> Retour à l'inscription
                </button>
              </div>
            </form>
          )}

          {/* Switch Mode */}
          {mode !== "verify" && (
            <>
              <div className="mt-8 text-center font-body-md text-body-md">
                <span className="text-on-surface-variant">
                  {mode === "login" ? "Nouveau sur SK Academia ?" : "Vous avez déjà un compte ?"}
                </span>
                <button
                  type="button"
                  onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setMessage(""); }}
                  className="ml-2 text-primary font-bold hover:underline transition-all"
                >
                  {mode === "login" ? "Créer un compte" : "Se connecter"}
                </button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-surface text-outline font-label-md uppercase tracking-wider text-xs font-bold">Ou continuer avec</span>
                </div>
              </div>

              <button
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-surface-container-lowest border-2 border-outline-variant hover:border-primary hover:bg-surface-variant text-on-surface font-label-md text-label-md py-3.5 rounded-xl transition-all disabled:opacity-50 active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
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
