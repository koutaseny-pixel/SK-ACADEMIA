import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function Footer() {
  const supabase = await createClient();
  let settings = null;
  try {
    const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
    settings = data;
  } catch (err) {
    console.error("Footer settings fetch error:", err);
  }

  const email = settings?.email || "support@skacademy.sn";
  const phone = settings?.phone || "+221 77 000 00 00";
  const address = settings?.address || "Dakar, Sénégal";
  return (
    <footer className="bg-[#1b508f] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-black mb-6 tracking-tight">SK ACADEMIA</h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Votre clé pour réussir les concours au Sénégal. Fascicules numériques, cours vidéo, et formations en informatique de qualité pour exceller.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/221000000000" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-green-500 transition-colors"><MessageCircle size={16} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 text-xs font-bold rounded bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors">Fb</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 text-xs font-bold rounded bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors">Yt</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 text-xs font-bold rounded bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors">Ig</a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-blue-200">ACCUEIL</h4>
            <ul className="space-y-3 text-sm text-blue-100">
              <li><Link href="/catalog" className="hover:text-white transition-colors">Boutique</Link></li>
              <li><Link href="/catalog?category=prepa" className="hover:text-white transition-colors">Préparation concours</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Foire aux questions</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">À propos de nous</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-blue-200">FORMATIONS</h4>
            <ul className="space-y-3 text-sm text-blue-100">
              <li><Link href="/catalog?category=formation" className="hover:text-white transition-colors">Bureautique (Word, Excel)</Link></li>
              <li><Link href="/catalog?category=formation" className="hover:text-white transition-colors">Programmation</Link></li>
              <li><Link href="/catalog?category=formation" className="hover:text-white transition-colors">Web Design</Link></li>
              <li><Link href="/catalog?category=formation" className="hover:text-white transition-colors">Entrepreneuriat</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-blue-200">CONTACT</h4>
            <ul className="space-y-4 text-sm text-blue-100">
              <li className="flex items-start gap-3">
                <Phone size={18} className="shrink-0 mt-0.5" />
                <span className="whitespace-pre-wrap">{phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span className="whitespace-pre-wrap">{address}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 text-sm text-center text-blue-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} SK Academy. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Conditions générales</Link>
            <Link href="#" className="hover:text-white transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
