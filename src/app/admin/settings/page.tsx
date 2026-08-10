"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const [settings, setSettings] = useState({
    email: "",
    phone: "",
    address: ""
  });

  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error; // Ignorer l'erreur si aucune ligne
      
      if (data) {
        setSettings({
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || ""
        });
      }
    } catch (err: any) {
      console.error("Erreur lors de la récupération des paramètres :", err);
      setError("Impossible de charger les paramètres.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      // Utilise update au lieu de upsert car la ligne existe déjà et RLS n'autorise que UPDATE
      const { error } = await supabase
        .from('site_settings')
        .update({ 
          email: settings.email, 
          phone: settings.phone, 
          address: settings.address,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);

      if (error) throw error;
      
      setMessage("Paramètres mis à jour avec succès.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      console.error("Erreur lors de la sauvegarde :", err);
      setError("Erreur lors de la mise à jour des paramètres.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Chargement des paramètres...</div>;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Paramètres du site</h1>
        <p className="text-gray-500 mt-1">Gérez les informations de contact globales affichées sur le site.</p>
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

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informations de Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Adresse Email Support</label>
              <input 
                type="email" 
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
                className="w-full border border-gray-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Numéro de Téléphone</label>
              <input 
                type="text" 
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
                className="w-full border border-gray-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Adresse / Siège Social</label>
            <input 
              type="text" 
              value={settings.address}
              onChange={(e) => setSettings({...settings, address: e.target.value})}
              className="w-full border border-gray-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 font-medium"
              required
            />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Sauvegarde..." : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
