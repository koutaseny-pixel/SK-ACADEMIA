import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Youtube, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook size={16} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors"><Youtube size={16} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors"><Instagram size={16} /></a>
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
                <span>+221 77 000 00 00<br/>+221 76 000 00 00</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="shrink-0 mt-0.5" />
                <a href="mailto:support@skacademy.sn" className="hover:text-white transition-colors">support@skacademy.sn</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span>Dakar, Sénégal</span>
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
