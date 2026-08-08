import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { Award, MonitorPlay, BookDown, ArrowRight } from "lucide-react";

export default function Home() {
  const featuredProducts = [
    { id: "1", name: "Fascicule ENA 2026", category: "Préparation Concours", price: 5000, image_url: "" },
    { id: "2", name: "Fascicule Gendarmerie", category: "Préparation Concours", price: 3500, image_url: "" },
    { id: "3", name: "Bureautique (Word/Excel)", category: "Formation Informatique", price: 7000, image_url: "" },
    { id: "4", name: "Initiation Web Design", category: "Formation Informatique", price: 15000, image_url: "" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section with Diagonal Split */}
      <section className="relative bg-white overflow-hidden">
        {/* The Diagonal Blue Background on the right */}
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-[#1b508f] transform origin-top-left -skew-x-[20deg] translate-x-32 z-0"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch relative z-10">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 py-20 px-4 sm:px-6 lg:px-8 lg:py-32 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
              SK ACADEMY : VOTRE CLÉ POUR RÉUSSIR LES CONCOURS AU SÉNÉGAL
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg font-medium">
              Fascicules numériques, cours vidéo, et formations en informatique de qualité pour exceller.
            </p>
            <div>
              <Link href="/catalog" className="inline-block bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-4 px-8 rounded transition-colors text-lg">
                DÉCOUVRE NOS PRODUITS
              </Link>
            </div>
          </div>
          
          {/* Right Image (Placeholder for now) */}
          <div className="w-full lg:w-1/2 bg-gray-200 lg:bg-transparent min-h-[400px] lg:min-h-full relative overflow-hidden flex items-center justify-center p-8">
             {/* Note: User will replace this div with the actual image of students */}
             <div className="w-full max-w-lg aspect-[4/3] bg-gray-300 rounded-xl shadow-2xl relative z-10 flex items-center justify-center text-gray-500 font-medium border-4 border-white/20">
               [Image Étudiants]
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
