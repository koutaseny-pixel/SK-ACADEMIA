import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, GraduationCap, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 hero-pattern overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/50 to-transparent pointer-events-none"></div>
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Text Content */}
            <div className="flex flex-col items-start space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high/50 border border-outline-variant/30 backdrop-blur-sm shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="font-label-md text-label-md text-on-surface">Rejoignez +10 000 apprenants actifs</span>
              </div>
              
              <h1 className="font-display text-[40px] md:text-display text-on-background leading-tight">
                La plateforme qui <br className="hidden md:block"/>
                <span className="text-gradient relative inline-block">
                  accélère votre réussite
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-fixed-dim/40 z-[-1]" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg"><path d="M2.00035 7.1534C51.6847 -1.61466 142.753 -1.82195 197.669 7.1534" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path></svg>
                </span><br/>
                académique et professionnelle.
              </h1>
              
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Ressources pédagogiques de pointe, préparations aux concours exigeants et formations qualifiantes. Construisez votre avenir avec les meilleurs outils.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/catalog" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md shadow-[0_8px_20px_rgba(30,64,175,0.25)] hover:shadow-[0_12px_25px_rgba(30,64,175,0.35)] hover:-translate-y-1 active:scale-95 transition-all">
                  Explorer la boutique
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>arrow_forward</span>
                </Link>
                <Link href="/catalog?category=formation" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-on-background border border-outline-variant rounded-xl font-label-md text-label-md hover:bg-surface-variant hover:border-primary-fixed-dim transition-all active:scale-95">
                  Découvrir les formations
                </Link>
              </div>

              {/* Social Proof Logos */}
              <div className="pt-8 border-t border-outline-variant/30 w-full mt-4">
                <p className="font-caption text-caption text-outline mb-4">Ils nous font confiance</p>
                <div className="flex items-center gap-6 opacity-60 grayscale">
                  <span className="font-display font-bold text-xl">Université Paris</span>
                  <span className="font-display font-bold text-xl">ENA Alumni</span>
                  <span className="font-display font-bold text-xl">Tech Institute</span>
                </div>
              </div>
            </div>

            {/* Hero Image/3D Mockup */}
            <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden glass-panel p-2 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-surface-container to-primary-fixed opacity-50"></div>
              {/* Note: Using a placeholder or actual image URL from original design */}
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="SK Academia Platform" 
                className="w-full h-full object-cover rounded-[20px] relative z-10 opacity-90"
              />
              
              {/* Floating UI Elements */}
              <div className="absolute top-10 -left-6 z-20 glass-panel rounded-xl p-4 shadow-lg flex items-center gap-4 animate-[bounce_4s_infinite]">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>trending_up</span>
                </div>
                <div>
                  <p className="font-caption text-caption text-on-surface-variant">Taux de réussite</p>
                  <p className="font-label-md text-label-md font-bold text-on-background">94% au 1er essai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-outline-variant/20 relative z-20 -mt-8 mx-margin-mobile md:mx-margin-desktop rounded-2xl card-shadow">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-outline-variant/20">
            <div className="text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-2" style={{fontVariationSettings: "'FILL' 0"}}>groups</span>
              <h3 className="font-display text-[32px] font-bold text-on-background">10k+</h3>
              <p className="font-caption text-caption text-on-surface-variant mt-1">Étudiants Actifs</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-2" style={{fontVariationSettings: "'FILL' 0"}}>library_books</span>
              <h3 className="font-display text-[32px] font-bold text-on-background">500+</h3>
              <p className="font-caption text-caption text-on-surface-variant mt-1">Ressources Premium</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-2" style={{fontVariationSettings: "'FILL' 0"}}>cast_for_education</span>
              <h3 className="font-display text-[32px] font-bold text-on-background">100+</h3>
              <p className="font-caption text-caption text-on-surface-variant mt-1">Formations Expertes</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-2" style={{fontVariationSettings: "'FILL' 0"}}>verified</span>
              <h3 className="font-display text-[32px] font-bold text-on-background">4.9/5</h3>
              <p className="font-caption text-caption text-on-surface-variant mt-1">Note Moyenne</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional sections can be added here (e.g. Featured courses, etc.) */}
      <div className="pb-24"></div>
    </div>
  );
}
