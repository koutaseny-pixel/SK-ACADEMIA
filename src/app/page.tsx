import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { Award, MonitorPlay, BookDown, ArrowRight, MessageCircle } from "lucide-react";

export default function Home() {
  const featuredProducts = [
    { id: "1", name: "Fascicule ENA 2026", category: "Préparation Concours", price: 5000, image_url: "" },
    { id: "2", name: "Fascicule Gendarmerie", category: "Préparation Concours", price: 3500, image_url: "" },
    { id: "3", name: "Bureautique (Word/Excel)", category: "Formation Informatique", price: 7000, image_url: "" },
    { id: "4", name: "Initiation Web Design", category: "Formation Informatique", price: 15000, image_url: "" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white overflow-hidden pt-12 pb-24">
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
                Fascicules numériques, cours vidéo, et formations en informatique de qualité pour exceller.
              </p>
            </div>
            
            {/* Right Image */}
            <div className="w-full lg:w-1/2 relative flex justify-end">
              <div className="relative w-full max-w-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/3] flex items-center justify-center text-gray-400 font-medium border-8 border-white">
                [Image Étudiant]
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

              {/* Floating Chat Buttons (WhatsApp/Messenger style) */}
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

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">NOS CATÉGORIES DE PRODUITS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Category 1 */}
            <Link href="/catalog?category=prepa" className="group bg-white border-2 border-gray-100 hover:border-[#1b508f] rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg flex flex-col items-center">
              <div className="w-24 h-24 mb-6 text-yellow-600 group-hover:scale-110 transition-transform">
                <Award size={96} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Préparation Concours<br/>(Sénégal)</h3>
              <p className="text-gray-500 font-medium">
                Concours ENA<br/>
                Concours Gendarmerie<br/>
                Concours Santé
              </p>
            </Link>

            {/* Category 2 */}
            <Link href="/catalog?category=formation" className="group bg-white border-2 border-gray-100 hover:border-[#1b508f] rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg flex flex-col items-center">
              <div className="w-24 h-24 mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                <MonitorPlay size={96} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Formations Informatique</h3>
              <p className="text-gray-500 font-medium">
                Bureautique (Word, Excel)<br/>
                Programmation<br/>
                Web Design
              </p>
            </Link>

            {/* Category 3 */}
            <Link href="/catalog?category=ressources" className="group bg-white border-2 border-gray-100 hover:border-[#1b508f] rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg flex flex-col items-center">
              <div className="w-24 h-24 mb-6 text-[#1b508f] group-hover:scale-110 transition-transform">
                <BookDown size={96} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Fascicules Digitaux & Ressources</h3>
              <p className="text-gray-500 font-medium">
                Ressources gratuites<br/>
                Fiches de révision<br/>
                E-books
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">NOS PRODUITS VEDETTES</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/catalog" className="inline-flex items-center gap-2 text-[#1b508f] font-bold hover:underline">
              Voir tout le catalogue <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-blue-50 rounded-3xl overflow-hidden">
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[400px] bg-gray-300 flex items-center justify-center text-gray-500 font-medium">
            [Image Étudiante]
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase leading-tight">
              SK ACADEMY : VOTRE CLÉ POUR RÉUSSIR
            </h2>
            <p className="text-gray-600 mb-8 font-medium">
              Fascicules numériques, cours vidéo, et formations en informatique de qualité pour exceller dans vos études et votre carrière professionnelle au Sénégal.
            </p>
            <Link href="/about" className="inline-block bg-accent hover:bg-accent-hover text-white font-bold py-3 px-8 rounded transition-colors">
              DÉCOUVRIR PLUS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
