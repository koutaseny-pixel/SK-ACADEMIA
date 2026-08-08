"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Lock, Bell, Save, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({ firstName: "", lastName: "", email: "" });
  const [passwordData, setPasswordData] = useState({ newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setProfileData({
          firstName: user.user_metadata?.first_name || "",
          lastName: user.user_metadata?.last_name || "",
          email: user.email || "",
        });
      }
    };
    getUser();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileError("");
    setProfileSuccess(false);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: profileData.firstName,
          last_name: profileData.lastName,
        },
      });
      if (error) throw error;
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err: any) {
      setProfileError(err.message || "Erreur lors de la mise à jour du profil.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setSavingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwordData.newPassword });
      if (error) throw error;
      setPasswordSuccess(true);
      setPasswordData({ newPassword: "", confirmPassword: "" });
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      setPasswordError(err.message || "Erreur lors du changement de mot de passe.");
    } finally {
      setSavingPassword(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Mon Profil", icon: User },
    { id: "security", label: "Sécurité", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Paramètres du compte</h1>
        <p className="text-gray-500 text-sm mt-1">Gérez vos informations personnelles et la sécurité de votre compte.</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-[#1b508f] text-[#1b508f] bg-blue-50/50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="max-w-lg space-y-6">
              <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1b508f] to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg">
                  {(profileData.firstName || profileData.email).charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {profileData.firstName ? `${profileData.firstName} ${profileData.lastName}` : "—"}
                  </p>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                  <span className="inline-block mt-1 bg-blue-100 text-[#1b508f] text-xs font-bold px-2 py-0.5 rounded-full">Étudiant</span>
                </div>
              </div>

              {profileError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{profileError}</div>
              )}
              {profileSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                  <CheckCircle size={16} /> Profil mis à jour avec succès !
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Prénom</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#1b508f]/20 focus:border-[#1b508f] transition-all"
                    placeholder="Mamadou"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#1b508f]/20 focus:border-[#1b508f] transition-all"
                    placeholder="Diop"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Adresse email</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full border border-gray-100 bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">L'email ne peut pas être modifié directement.</p>
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="inline-flex items-center gap-2 bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-900/20 disabled:opacity-50"
              >
                {savingProfile ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Enregistrer les modifications
              </button>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="max-w-lg space-y-8">
              <form onSubmit={handleChangePassword} className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900">Changer le mot de passe</h2>

                {passwordError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{passwordError}</div>
                )}
                {passwordSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                    <CheckCircle size={16} /> Mot de passe changé avec succès !
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nouveau mot de passe</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#1b508f]/20 focus:border-[#1b508f] transition-all"
                      placeholder="Minimum 8 caractères"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {passwordData.newPassword && (
                    <div className="mt-2 flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                          passwordData.newPassword.length >= i * 2
                            ? passwordData.newPassword.length >= 12 ? "bg-green-500" : "bg-orange-400"
                            : "bg-gray-200"
                        }`} />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Confirmer le mot de passe</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className={`w-full border bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:ring-2 transition-all ${
                      passwordData.confirmPassword && passwordData.confirmPassword !== passwordData.newPassword
                        ? "border-red-400 focus:ring-red-400/20"
                        : "border-gray-200 focus:ring-[#1b508f]/20 focus:border-[#1b508f]"
                    }`}
                    placeholder="Répétez le mot de passe"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingPassword}
                  className="inline-flex items-center gap-2 bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-900/20 disabled:opacity-50"
                >
                  {savingPassword ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
                  Mettre à jour le mot de passe
                </button>
              </form>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Informations sur la session</h3>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-2">
                  <p><span className="font-medium">Email :</span> {user?.email}</p>
                  <p><span className="font-medium">Dernière connexion :</span> {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}</p>
                  <p><span className="font-medium">Compte créé le :</span> {user?.created_at ? new Date(user.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }) : "—"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="max-w-lg space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Préférences de notification</h2>
              {[
                { label: "Confirmation de commande", desc: "Recevoir un email lors de chaque nouvelle commande.", defaultOn: true },
                { label: "Validation du paiement", desc: "Être notifié quand votre commande passe au statut Payée.", defaultOn: true },
                { label: "Nouveaux produits", desc: "Recevoir des emails sur les nouvelles ressources disponibles.", defaultOn: false },
                { label: "Promotions", desc: "Offres spéciales et réductions sur nos produits.", defaultOn: false },
              ].map((pref) => (
                <div key={pref.label} className="flex items-start justify-between gap-4 py-4 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{pref.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{pref.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" defaultChecked={pref.defaultOn} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1b508f]"></div>
                  </label>
                </div>
              ))}
              <button className="inline-flex items-center gap-2 bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-900/20">
                <Save size={18} /> Sauvegarder les préférences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
