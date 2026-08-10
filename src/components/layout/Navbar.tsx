import Link from "next/link";
import CartBadge from "@/components/ui/CartBadge";
import { GraduationCap, Gift, UserCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/supabase/role";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const role = user ? await getUserRole() : null;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 md:gap-4">
            <MobileMenu />
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
            <div className="text-[#1b508f]">
              <GraduationCap size={32} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#1b508f] leading-none">SK ACADEMIA</span>
              <span className="text-[10px] uppercase tracking-widest text-orange-500 mt-1 font-bold">Excellence Académique</span>
            </div>
          </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors border-b-2 border-orange-500 pb-1">
              Accueil
            </Link>
            <Link href="/catalog" className="text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors">
              Boutique
            </Link>
            <Link href="/catalog?category=prepa" className="text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors">
              Préparation Concours
            </Link>
            <Link href="/catalog?category=formation" className="text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors">
              Formations Informatique
            </Link>
            <Link href="/about" className="text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors">
              À Propos
            </Link>
            <Link href="/contact" className="text-sm font-bold text-gray-600 hover:text-orange-500 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Cart & Parrainage & Auth */}
          <div className="flex items-center gap-6">
            <CartBadge />
            
            <div className="flex items-center gap-3">
              <Link href="#" className="hidden sm:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors shadow-md">
                <Gift size={16} /> Parrainage
              </Link>
              
              {user ? (
                <UserMenu user={user} role={role} />
              ) : (
                <Link href="/login" className="text-gray-400 hover:text-orange-500 transition-colors ml-2">
                  <UserCircle size={32} strokeWidth={1.5} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
