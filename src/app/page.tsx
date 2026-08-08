import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { Award, MonitorPlay, BookDown, ArrowRight, MessageCircle, Star, ShieldCheck, Zap, HelpCircle, CheckCircle2 } from "lucide-react";

export default function Home() {
  const featuredProducts = [
    { id: "1", name: "Fascicule ENA 2026", category: "Préparation Concours", price: 5000, image_url: "" },
    { id: "2", name: "Fascicule Gendarmerie", category: "Préparation Concours", price: 3500, image_url: "" },
    { id: "3", name: "Bureautique (Word/Excel)", category: "Formation Informatique", price: 7000, image_url: "" },
    { id: "4", name: "Initiation Web Design", category: "Formation Informatique", price: 15000, image_url: "" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 1. Hero Section (Reverted to Original Clean Design) */}
      <section className="bg-white overflow-hidden pt-12 pb-24 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center relative">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-500 font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wider mb-8 w-max">
                La Plateforme Éducative #1 au Sénégal
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-black tracking-tight text-gray-900 leading-[1.1] mb-6">
                SK ACADEMIA :<br/>VOTRE CLÉ POUR<br/>
                <span className="text-orange-500">RÉUSSIR LES<br/>CONCOURS AU<br/>SÉNÉGAL</span>
              </h1>
              
              <p className="text-lg text-gray-500 mb-10 max-w-lg font-medium leading-relaxed">
                Fascicules numériques, cours vidéo, et formations en informatique de qualité pour exceller dans vos études.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/catalog" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-colors text-lg shadow-xl shadow-orange-500/20">
                  Découvrir nos produits
                </Link>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-500 px-4">
                  <ShieldCheck size={20} className="text-[#1b508f]" /> Paiement 100% Sécurisé
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full lg:w-1/2 relative flex justify-end">
              <div className="relative w-full max-w-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/3] flex items-center justify-center border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Étudiant étudiant sur son ordinateur" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badges */}
              <div className="absolute top-1/4 -left-8 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <div className="bg-blue-50 p-3 rounded-lg text-[#1b508f]">
                  <BookDown size={24} />
                </div>
                <div>
                  <div className="font-black text-gray-900 leading-tight">500+ Docs</div>
                  <div className="text-xs text-gray-500 font-medium">Disponibles</div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 z-10">
                <div className="bg-orange-50 p-3 rounded-lg text-orange-500">
                  <Award size={24} />
                </div>
                <div>
                  <div className="font-black text-gray-900 leading-tight">98% Réussite</div>
                  <div className="text-xs text-gray-500 font-medium">Nos étudiants</div>
                </div>
              </div>

              {/* Floating Chat Buttons */}
              <div className="absolute -right-4 -bottom-4 flex flex-col gap-3 z-20">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <MessageCircle size={28} />
                </div>
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#1b508f] tracking-tight mb-4">TROUVEZ CE QU'IL VOUS FAUT</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">Des ressources adaptées à chaque étape de votre parcours académique et professionnel.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link href="/catalog?category=prepa" className="group bg-white rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 flex flex-col items-center">
              <div className="w-20 h-20 mb-6 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <Award size={40} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase">Préparation Concours</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Préparez-vous aux grands concours sénégalais (ENA, Douanes, Gendarmerie, FASTEF) avec nos annales et corrigés exclusifs.
              </p>
            </Link>

            <Link href="/catalog?category=formation" className="group bg-white rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 flex flex-col items-center">
              <div className="w-20 h-20 mb-6 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1b508f] group-hover:bg-[#1b508f] group-hover:text-white transition-colors">
                <MonitorPlay size={40} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase">Formations Informatique</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Maîtrisez la Bureautique (Word, Excel, PowerPoint), le Web Design et la Programmation avec nos cours certifiants.
              </p>
            </Link>

            <Link href="/catalog?category=ressources" className="group bg-white rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 flex flex-col items-center">
              <div className="w-20 h-20 mb-6 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <BookDown size={40} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase">Ressources & E-books</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Des fiches de révision de qualité universitaire, des tutoriels PDF et des astuces pour maximiser votre productivité.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. How It Works (Comment ça marche) - NOUVEAU */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">COMMENT ÇA MARCHE ?</h2>
            <p className="text-gray-500 font-medium">Obtenez vos ressources en 3 étapes simples, directement depuis votre téléphone ou PC.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
            {/* Ligne de connexion (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-1 bg-gray-100 z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-3xl font-black text-gray-300 mb-6 shadow-sm">1</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Choisissez vos fascicules</h3>
              <p className="text-gray-500 text-sm font-medium">Parcourez notre catalogue et ajoutez les documents de votre choix à votre panier.</p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white border-4 border-[#1b508f] rounded-full flex items-center justify-center text-3xl font-black text-[#1b508f] mb-6 shadow-md">2</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Payez en toute sécurité</h3>
              <p className="text-gray-500 text-sm font-medium">Validez votre commande via Orange Money, Wave ou Carte Bancaire en quelques clics.</p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-orange-500 border-4 border-white shadow-xl rounded-full flex items-center justify-center text-3xl font-black text-white mb-6">3</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Téléchargez instantanément</h3>
              <p className="text-gray-500 text-sm font-medium">Vos documents sont immédiatement disponibles dans votre espace client (PDF/Vidéos).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">NOS BEST-SELLERS</h2>
              <p className="text-gray-500 font-medium">Les documents les plus téléchargés par nos étudiants.</p>
            </div>
            <Link href="/catalog" className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors">
              Voir tout le catalogue <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials (Preuve Sociale) - NOUVEAU */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1b508f] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">ILS ONT RÉUSSI AVEC SK ACADEMIA</h2>
            <p className="text-blue-200 font-medium">Rejoignez des milliers d'étudiants satisfaits partout au Sénégal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-800 p-8 rounded-3xl relative">
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

            <div className="bg-blue-800 p-8 rounded-3xl relative">
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

            <div className="bg-blue-800 p-8 rounded-3xl relative">
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
              <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2"><HelpCircle size={20} className="text-[#1b508f]"/> Comment vais-je recevoir mes fascicules ?</h3>
              <p className="text-gray-600 font-medium">Une fois le paiement validé, vos documents seront disponibles immédiatement et à vie dans la rubrique "Mes Téléchargements" de votre tableau de bord.</p>
            </div>
            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2"><HelpCircle size={20} className="text-[#1b508f]"/> Quels sont les moyens de paiement ?</h3>
              <p className="text-gray-600 font-medium">Nous acceptons le paiement mobile (Wave, Orange Money, Free Money) ainsi que les paiements par Carte Bancaire via nos partenaires sécurisés.</p>
            </div>
            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2"><HelpCircle size={20} className="text-[#1b508f]"/> Les documents sont-ils mis à jour ?</h3>
              <p className="text-gray-600 font-medium">Oui, toutes nos annales sont révisées chaque année pour inclure les concours récents et les corrections les plus précises.</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/faq" className="text-[#1b508f] font-bold hover:underline">Voir toutes les questions fréquentes &rarr;</Link>
          </div>
        </div>
      </section>

      {/* 7. Call to Action Final (Bottom Content) - AMÉLIORÉ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[500px] bg-gray-300 relative">
            <img 
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
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
              <span className="text-[#1b508f]">AU HASARD.</span>
            </h2>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-gray-600 font-bold"><CheckCircle2 size={24} className="text-orange-500" /> Documents de haute qualité</li>
              <li className="flex items-center gap-3 text-gray-600 font-bold"><CheckCircle2 size={24} className="text-orange-500" /> Accès à vie illimité</li>
              <li className="flex items-center gap-3 text-gray-600 font-bold"><CheckCircle2 size={24} className="text-orange-500" /> + de 5000 étudiants satisfaits</li>
            </ul>
            <Link href="/catalog" className="inline-block bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-4 px-10 rounded-full transition-colors shadow-lg text-lg w-full text-center sm:w-auto">
              COMMENCER MA PRÉPARATION
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
