import Link from "next/link";
import CartBadge from "@/components/ui/CartBadge";
import { Facebook, Instagram, Youtube, BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#1b508f] text-white text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>Digital Products & Exam Preparation in Senegal</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-accent transition-colors"><Facebook size={14} /></a>
            <a href="#" className="hover:text-accent transition-colors"><Instagram size={14} /></a>
            <a href="#" className="hover:text-accent transition-colors"><Youtube size={14} /></a>
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <nav className="bg-white text-gray-900 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-center gap-1">
              <div className="flex items-center text-primary font-bold text-xl leading-none">
                SK <span className="text-accent ml-1"><BookOpen size={24} /></span>
              </div>
              <span className="font-extrabold text-[#1b508f] tracking-tight text-xl leading-none mt-1">ACADEMY</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex space-x-6 text-sm font-bold">
              <Link href="/" className="text-accent hover:text-accent transition-colors">ACCUEIL</Link>
              <Link href="/catalog" className="hover:text-primary transition-colors">BOUTIQUE</Link>
              <Link href="/catalog?category=prepa" className="hover:text-primary transition-colors">PRÉPARATION CONCOURS</Link>
              <Link href="/catalog?category=formation" className="hover:text-primary transition-colors">FORMATIONS INFORMATIQUE</Link>
              <Link href="/about" className="hover:text-primary transition-colors">À PROPOS</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">CONTACT</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <CartBadge />
              <Link href="/login" className="hidden sm:inline-flex bg-[#1b508f] text-white hover:bg-blue-800 px-5 py-2 rounded font-bold text-sm transition-colors">
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
