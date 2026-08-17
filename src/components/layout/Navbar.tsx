import Link from "next/link";
import CartBadge from "@/components/ui/CartBadge";
import { createClient } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/supabase/role";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const role = user ? await getUserRole() : null;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-on-background/80 backdrop-blur-xl border-b border-white/20 dark:border-on-surface-variant/20 shadow-sm transition-transform duration-300" id="top-nav">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
        
        {/* Brand */}
        <div className="flex items-center gap-2 md:gap-4">
          <MobileMenu />
          <Link href="/" className="font-display text-headline-md font-bold text-primary dark:text-primary-fixed-dim flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-95 transition-transform duration-300">
              <span className="material-symbols-outlined font-bold" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
            </div>
            <span className="hidden sm:block">SK Academia</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-gutter">
          <Link href="/catalog" className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-colors duration-200">
            Boutique
          </Link>
          <Link href="/catalog?category=prepa" className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-colors duration-200">
            Concours
          </Link>
          <Link href="/catalog?category=formation" className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-colors duration-200">
            Formations
          </Link>
          <Link href="/catalog?category=ressources" className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-colors duration-200">
            E-books
          </Link>
          <Link href="/about" className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-colors duration-200">
            À Propos
          </Link>
          <Link href="/contact" className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-colors duration-200">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-sm">
          <div className="hidden md:flex items-center gap-2">
            <button aria-label="search" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
            <CartBadge />
          </div>

          {user ? (
            <div className="ml-2">
              <UserMenu user={user} role={role} />
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden md:flex items-center justify-center px-6 py-2.5 font-label-md text-label-md text-primary hover:bg-surface-variant rounded-lg transition-colors">
                Connexion
              </Link>
              <Link href="/login" className="items-center justify-center px-6 py-2.5 font-label-md text-label-md bg-primary text-on-primary rounded-lg hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all hidden sm:flex">
                S'inscrire
              </Link>
              {/* Mobile login icon */}
              <Link href="/login" className="flex sm:hidden items-center justify-center p-sm text-primary hover:bg-surface-container rounded-full transition-colors duration-200">
                <span className="material-symbols-outlined">account_circle</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
