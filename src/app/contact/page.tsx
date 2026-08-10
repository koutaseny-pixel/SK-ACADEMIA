import { MapPin, Phone, Mail, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0; // Disable static caching so settings update instantly

export default async function Contact() {
  const supabase = await createClient();
  let settings = null;
  try {
    const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
    settings = data;
  } catch (err) {
    console.error("Contact settings fetch error:", err);
  }

  const email = settings?.email || "support@skacademia.sn";
  const phone = settings?.phone || "+221 77 000 00 00";
  const address = settings?.address || "Dakar, Sénégal\n(Sur rendez-vous uniquement)";
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Contactez-nous</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vous avez des questions sur nos fascicules ou besoin d'aide avec un téléchargement ? Notre équipe est là pour vous.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Informations de contact */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Email</h3>
                <p className="text-gray-600 mb-2">Notre équipe répond sous 24h.</p>
                <a href={`mailto:${email}`} className="font-medium text-[#1b508f] hover:underline">{email}</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1b508f] shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Téléphone</h3>
                <p className="text-gray-600 mb-2">Lun - Ven, 9h à 18h.</p>
                <a href={`tel:${phone}`} className="font-medium text-orange-500 hover:underline">{phone}</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Siège</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{address}</p>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:w-2/3">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-8">Envoyer un message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom complet</label>
                    <input type="text" className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Adresse Email</label>
                    <input type="email" className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" placeholder="vous@exemple.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sujet</label>
                  <input type="text" className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" placeholder="Comment pouvons-nous aider ?" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea rows={6} className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none" placeholder="Décrivez votre demande en détail..."></textarea>
                </div>
                <button type="button" className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-1 text-lg">
                  <Send size={20} />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
