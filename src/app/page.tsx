import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProductMarquee from "@/components/ui/ProductMarquee";
import { Award, MonitorPlay, BookDown, ArrowRight, MessageCircle, Star, ShieldCheck, Zap, HelpCircle, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(4);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 1. Hero Section (Reverted to Original Clean Design) */}
      <section className="bg-white overflow-hidden pt-12 pb-24 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            <div className="w-full lg:w-1/2 flex flex-col justify-center relative">
              <ScrollReveal direction="up" delay={0.1}>
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 bg-[#00853f]/10 text-[#00853f] font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wider mb-8 w-max border border-[#00853f]/20">
                  La Plateforme Éducative #1 au Sénégal
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-black tracking-tight text-gray-900 leading-[1.1] mb-6">
                  SK ACADEMIA :<br/>VOTRE CLÉ POUR<br/>
                  <span className="text-[#00853f]">RÉUSSIR LES<br/>CONCOURS AU<br/>SÉNÉGAL</span>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-lg text-gray-600 mb-10 max-w-lg font-medium leading-relaxed">
                  Fascicules numériques, cours vidéo, et formations en informatique de qualité pour exceller dans vos études.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/catalog" className="relative overflow-hidden group inline-flex items-center justify-center bg-[#00853f] hover:bg-[#006e33] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 text-lg shadow-xl hover:shadow-[#00853f]/40 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    <span className="relative z-10">Découvrir nos produits</span>
                  </Link>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-600 px-4">
                    <ShieldCheck size={20} className="text-[#00853f]" /> Paiement 100% Sécurisé
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Right Image */}
            <div className="w-full lg:w-1/2 relative flex justify-end">
              <ScrollReveal direction="left" delay={0.5} className="w-full flex justify-end">
                <div className="relative w-full max-w-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-[#0a192f] aspect-[4/3] border-8 border-white flex items-center justify-center">
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#d4af37]/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                  
                  {/* Abstract Shelves Background */}
                  <div className="absolute inset-0 flex flex-col justify-between py-16 opacity-20">
                     <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                     <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                     <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                  </div>

                  {/* Secondary Books in Background */}
                  <div className="absolute left-8 bottom-12 w-[140px] h-[200px] bg-gradient-to-br from-green-700 to-green-900 rounded-r-lg rounded-l-sm shadow-2xl border-l-4 border-green-950 flex flex-col items-center justify-center p-4 transform -rotate-12 opacity-80 blur-[1px] hover:blur-none hover:opacity-100 transition-all duration-500">
                     <h3 className="text-white font-black text-lg uppercase text-center leading-tight">Annales<br/><span className="text-yellow-400">Douanes</span></h3>
                     <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 to-transparent"></div>
                  </div>
                  
                  <div className="absolute right-8 bottom-16 w-[140px] h-[190px] bg-gradient-to-br from-red-700 to-red-900 rounded-r-lg rounded-l-sm shadow-2xl border-l-4 border-red-950 flex flex-col items-center justify-center p-4 transform rotate-12 opacity-80 blur-[1px] hover:blur-none hover:opacity-100 transition-all duration-500">
                     <h3 className="text-white font-black text-lg uppercase text-center leading-tight">Concours<br/><span className="text-yellow-400">ENA</span></h3>
                     <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 to-transparent"></div>
                  </div>

                  {/* Main Featured Book (FASTEF) */}
                  <div className="relative z-10 w-[240px] h-[320px] bg-gradient-to-br from-[#1b508f] to-blue-900 rounded-r-xl rounded-l-sm shadow-[20px_20px_40px_rgba(0,0,0,0.6),inset_4px_0_10px_rgba(255,255,255,0.2)] border-l-8 border-[#0a2e5c] flex flex-col items-center justify-center p-6 text-center transform transition-transform hover:scale-105 duration-500 group">
                    <div className="absolute top-3 right-3 flex gap-1.5 opacity-80">
                       <span className="w-6 h-1 bg-green-500 rounded-full"></span>
                       <span className="w-6 h-1 bg-yellow-400 rounded-full"></span>
                       <span className="w-6 h-1 bg-red-500 rounded-full"></span>
                    </div>
                    
                    <div className="w-16 h-16 mb-4 mt-4 rounded-full bg-gradient-to-tr from-[#d4af37] to-yellow-200 p-1 shadow-lg group-hover:rotate-12 transition-transform duration-500">
                      <div className="w-full h-full bg-[#1b508f] rounded-full flex items-center justify-center border-2 border-white/20">
                         <span className="text-[#d4af37] font-black text-xl font-serif">SK</span>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-black text-[1.35rem] uppercase tracking-wider mb-2 leading-tight">
                      Réussir le <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-yellow-200">Concours</span>
                    </h3>
                    
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-3"></div>
                    
                    <p className="text-white font-black text-4xl mb-6 tracking-widest drop-shadow-md">FASTEF</p>
                    
                    <div className="mt-auto bg-gradient-to-r from-[#d4af37] to-yellow-500 text-[#0a2e5c] text-xs font-black uppercase px-5 py-2 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                      Édition 2025
                    </div>
                    
                    {/* Book spine lighting effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white/10 to-transparent rounded-l-sm"></div>
                  </div>
                  
                  {/* Floating Gold Stand Shadow */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-6 bg-gradient-to-b from-[#d4af37]/40 to-transparent rounded-[100%] blur-md z-0"></div>
                </div>
              </ScrollReveal>

              {/* Floating Badges */}
              <div className="absolute top-1/4 -left-8 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <div className="bg-[#e31b23]/10 p-3 rounded-lg text-[#e31b23]">
                  <BookDown size={24} />
                </div>
                <div>
                  <div className="font-black text-gray-900 leading-tight">500+ Docs</div>
                  <div className="text-xs text-gray-500 font-medium">Disponibles</div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 z-10">
                <div className="bg-[#fdef42]/20 p-3 rounded-lg text-yellow-600">
                  <Award size={24} />
                </div>
                <div>
                  <div className="font-black text-gray-900 leading-tight">98% Réussite</div>
                  <div className="text-xs text-gray-500 font-medium">Nos étudiants</div>
                </div>
              </div>

              {/* Floating Chat Buttons */}
              <div className="absolute -right-4 -bottom-4 flex flex-col gap-3 z-20">
                <div className="w-14 h-14 bg-[#00853f] rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <MessageCircle size={28} />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">TROUVEZ CE QU'IL VOUS FAUT</h2>
              <p className="text-gray-500 font-medium max-w-2xl mx-auto">Des ressources adaptées à chaque étape de votre parcours académique et professionnel.</p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1} index={0}>
              <Link href="/catalog?category=prepa" className="group bg-white rounded-3xl p-8 text-center transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-3 border border-gray-100 flex flex-col items-center h-full">
                <div className="w-20 h-20 mb-6 bg-[#00853f]/10 rounded-2xl flex items-center justify-center text-[#00853f] group-hover:bg-[#00853f] group-hover:text-white transition-colors">
                  <Award size={40} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase">Préparation Concours</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                  Préparez-vous aux grands concours sénégalais (ENA, Douanes, Gendarmerie, FASTEF) avec nos annales et corrigés exclusifs.
                </p>
              </Link>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} index={1}>
              <Link href="/catalog?category=formation" className="group bg-white rounded-3xl p-8 text-center transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-3 border border-gray-100 flex flex-col items-center h-full">
                <div className="w-20 h-20 mb-6 bg-[#fdef42]/20 rounded-2xl flex items-center justify-center text-yellow-600 group-hover:bg-yellow-400 group-hover:text-gray-900 transition-colors">
                  <MonitorPlay size={40} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase">Formations Informatique</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                  Maîtrisez la Bureautique (Word, Excel, PowerPoint), le Web Design et la Programmation avec nos cours certifiants.
                </p>
              </Link>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} index={2}>
              <Link href="/catalog?category=ressources" className="group bg-white rounded-3xl p-8 text-center transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-3 border border-gray-100 flex flex-col items-center h-full">
                <div className="w-20 h-20 mb-6 bg-[#e31b23]/10 rounded-2xl flex items-center justify-center text-[#e31b23] group-hover:bg-[#e31b23] group-hover:text-white transition-colors">
                  <BookDown size={40} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase">Ressources & E-books</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                  Des fiches de révision de qualité universitaire, des tutoriels PDF et des astuces pour maximiser votre productivité.
                </p>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. How It Works (Comment ça marche) - NOUVEAU */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">COMMENT ÇA MARCHE ?</h2>
              <p className="text-gray-500 font-medium">Obtenez vos ressources en 3 étapes simples, directement depuis votre téléphone ou PC.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
            {/* Ligne de connexion (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-1 bg-gray-100 z-0"></div>
            
            {/* Step 1 */}
            <ScrollReveal direction="up" delay={0.1} index={0}>
              <div className="relative z-10 flex flex-col items-center text-center group cursor-pointer transition-transform duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-3xl font-black text-gray-300 mb-6 shadow-sm">1</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Choisissez vos fascicules</h3>
                <p className="text-gray-500 text-sm font-medium">Parcourez notre catalogue et ajoutez les documents de votre choix à votre panier.</p>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal direction="up" delay={0.1} index={1}>
              <div className="relative z-10 flex flex-col items-center text-center group cursor-pointer transition-transform duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 bg-white border-4 border-yellow-400 rounded-full flex items-center justify-center text-3xl font-black text-yellow-500 mb-6 shadow-md">2</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Payez en toute sécurité</h3>
                <p className="text-gray-500 text-sm font-medium">Validez votre commande via Orange Money, Wave ou Carte Bancaire en quelques clics.</p>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal direction="up" delay={0.1} index={2}>
              <div className="relative z-10 flex flex-col items-center text-center group cursor-pointer transition-transform duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 bg-[#00853f] border-4 border-white shadow-xl rounded-full flex items-center justify-center text-3xl font-black text-white mb-6">3</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Téléchargez instantanément</h3>
                <p className="text-gray-500 text-sm font-medium">Vos documents sont immédiatement disponibles dans votre espace client (PDF/Vidéos).</p>
              </div>
            </ScrollReveal>
          </div>
      </section>

      {/* 4. Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">NOS BEST-SELLERS</h2>
                <p className="text-gray-500 font-medium">Les documents les plus téléchargés par nos étudiants.</p>
              </div>
              <Link href="/catalog" className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors">
                Voir tout le catalogue <ArrowRight size={20} />
              </Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <ProductMarquee products={featuredProducts || []} />
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Testimonials (Preuve Sociale) - NOUVEAU */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#00853f] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">ILS ONT RÉUSSI AVEC SK ACADEMIA</h2>
              <p className="text-blue-200 font-medium">Rejoignez des milliers d'étudiants satisfaits partout au Sénégal.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="bg-blue-800 p-8 rounded-3xl relative h-full">
                <div className="flex gap-1 text-orange-400 mb-6">
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                </div>
                <p className="text-blue-100 mb-8 italic">"Les annales pour le concours de l'ENA sont incroyables. Les corrections sont détaillées et j'ai retrouvé exactement le même type d'exercices à l'examen !"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">M</div>
                  <div>
                    <div className="font-bold">Mamadou D.</div>
                    <div className="text-blue-300 text-sm">Admis ENA 2025</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-blue-800 p-8 rounded-3xl relative h-full">
                <div className="flex gap-1 text-orange-400 mb-6">
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                </div>
                <p className="text-blue-100 mb-8 italic">"La formation en Bureautique m'a permis de décrocher mon premier stage. Le formateur explique super bien et on télécharge les vidéos direct."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">F</div>
                  <div>
                    <div className="font-bold">Fatou S.</div>
                    <div className="text-blue-300 text-sm">Étudiante UCAD</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="bg-blue-800 p-8 rounded-3xl relative h-full">
                <div className="flex gap-1 text-orange-400 mb-6">
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} />
                </div>
                <p className="text-blue-100 mb-8 italic">"Le site est super fluide. J'ai payé par Wave et j'ai eu mon fascicule de Gendarmerie en moins d'une minute sur mon espace perso. Je recommande."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">O</div>
                  <div>
                    <div className="font-bold">Ousmane K.</div>
                    <div className="text-blue-300 text-sm">Candidat Gendarmerie</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. FAQ Preview - NOUVEAU */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">QUESTIONS FRÉQUENTES</h2>
          </div>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2"><HelpCircle size={20} className="text-[#00853f]"/> Comment vais-je recevoir mes fascicules ?</h3>
              <p className="text-gray-500 text-sm">Une fois le paiement validé, vous recevrez un lien de téléchargement immédiat par email et dans votre espace personnel.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2"><HelpCircle size={20} className="text-[#00853f]"/> Quels sont les moyens de paiement ?</h3>
              <p className="text-gray-500 text-sm">Nous acceptons Orange Money, Wave, Free Money et les paiements par carte bancaire (Visa/Mastercard).</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2"><HelpCircle size={20} className="text-[#00853f]"/> Les documents sont-ils mis à jour ?</h3>
              <p className="text-gray-600 font-medium">Oui, toutes nos annales sont révisées chaque année pour inclure les concours récents et les corrections les plus précises.</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/faq" className="text-[#00853f] font-bold hover:underline">Voir toutes les questions fréquentes &rarr;</Link>
          </div>
        </div>
      </section>

      {/* 7. Call to Action Final (Bottom Content) - AMÉLIORÉ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
        <ScrollReveal direction="up">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[500px] bg-gray-300 relative">
              <img 
                src="https://images.unsplash.com/photo-1531123414780-f74242c2b052?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Étudiante souriante avec son diplôme" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white font-bold text-xl">L'avenir appartient à ceux qui se préparent dès aujourd'hui.</div>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-10 md:p-14">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                NE LAISSEZ PAS <br/>VOTRE AVENIR <br/>
                <span className="text-[#00853f]">AU HASARD.</span>
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
                Rejoignez des milliers d'étudiants qui font confiance à SK Academia pour leur réussite. N'attendez plus.
              </p>
              <Link href="/catalog" className="relative overflow-hidden group inline-block bg-[#e31b23] hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-red-500/40 hover:-translate-y-1 text-lg w-full text-center sm:w-auto">
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                <span className="relative z-10">COMMENCER MA PRÉPARATION</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
