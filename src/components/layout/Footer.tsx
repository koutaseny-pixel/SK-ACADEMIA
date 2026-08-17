import Link from "next/link";
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
    <footer className="w-full bg-surface dark:bg-on-background border-t border-outline-variant mt-auto">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col md:flex-row justify-between gap-lg">
        {/* Brand Column */}
        <div className="flex flex-col gap-sm max-w-sm">
          <Link href="/" className="font-display text-headline-md font-bold text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-sm font-bold" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
            </div>
            SK Academia
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity">
            La plateforme d'excellence pour votre réussite académique et professionnelle. Des ressources, des concours et des formations de haute qualité.
          </p>
          <div className="flex gap-4 mt-4">
            <a href={`mailto:${email}`} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>mail</span>
            </a>
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>call</span>
            </a>
            <a href="https://wa.me/221000000000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>chat</span>
            </a>
          </div>
        </div>

        {/* Links Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-xl">
          <div className="flex flex-col gap-sm">
            <h4 className="font-headline-md text-label-md font-semibold text-on-background mb-xs uppercase tracking-wider">Catalogue</h4>
            <Link href="/catalog" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">Boutique</Link>
            <Link href="/catalog?category=prepa" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">Concours</Link>
            <Link href="/catalog?category=formation" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">Formations</Link>
            <Link href="/catalog?category=ressources" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">E-books</Link>
          </div>
          
          <div className="flex flex-col gap-sm">
            <h4 className="font-headline-md text-label-md font-semibold text-on-background mb-xs uppercase tracking-wider">Institution</h4>
            <Link href="/about" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">À Propos</Link>
            <Link href="/contact" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">Contact</Link>
            <Link href="/faq" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">FAQ</Link>
            <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">Parrainage</Link>
          </div>
          
          <div className="flex flex-col gap-sm col-span-2 md:col-span-1">
            <h4 className="font-headline-md text-label-md font-semibold text-on-background mb-xs uppercase tracking-wider">Légal</h4>
            <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">Confidentialité</Link>
            <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">CGV</Link>
            <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">Mentions légales</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-outline-variant/30 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-caption text-caption text-on-surface-variant">© {new Date().getFullYear()} SK Academia. Excellence Académique.</p>
        <div className="flex items-center gap-2">
          <span className="font-caption text-caption text-outline">Made with precision</span>
          <span className="material-symbols-outlined text-sm text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>diamond</span>
        </div>
      </div>
    </footer>
  );
}
