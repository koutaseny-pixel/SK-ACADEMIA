import Link from "next/link";
import CartBadge from "@/components/ui/CartBadge";
import { Globe, MessageCircle, Video, BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-[#1b508f] text-white border-b border-blue-800 sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-orange-500 text-white text-xs text-center py-2 px-4 font-bold tracking-wide">
        ACCÉDEZ À TOUTES NOS ANCIENNES ÉPREUVES DU CONCOURS DE L'ENA !
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-black tracking-tight leading-none">SK ACADEMY</span>
            <span className="text-[10px] uppercase tracking-widest text-blue-200 mt-1">L'Excellence Numérique</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm font-bold text-white hover:text-orange-400 transition-colors uppercase">
              Accueil
            </Link>
            <Link href="/catalog?category=prepa" className="text-sm font-bold text-gray-300 hover:text-orange-400 transition-colors uppercase">
              Préparation Concours
            </Link>
            <Link href="/catalog?category=formation" className="text-sm font-bold text-gray-300 hover:text-orange-400 transition-colors uppercase">
              Formations
            </Link>
            <Link href="/about" className="text-sm font-bold text-gray-300 hover:text-orange-400 transition-colors uppercase">
              À Propos
            </Link>
          </nav>

          {/* Socials & Cart & Login */}
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-4 border-r border-blue-700 pr-6">
              <a href="#" className="text-blue-200 hover:text-white transition-colors"><Globe size={18} /></a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors"><MessageCircle size={18} /></a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors"><Video size={18} /></a>
            </div>
            
            <div className="flex items-center gap-4">
              <CartBadge />
              <Link href="/login" className="hidden sm:inline-flex bg-[#1b508f] text-white hover:bg-blue-800 px-5 py-2 rounded font-bold text-sm transition-colors">
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
