"use client";

import { useState } from "react";
import ProductCard, { Product } from "@/components/ui/ProductCard";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface CatalogClientProps {
  products: Product[];
  currentCategory?: string;
  currentSearch?: string;
  currentSort?: string;
}

const CATEGORIES = [
  { id: "prepa", label: "Préparation Concours", icon: "assignment" },
  { id: "formation", label: "Formations Informatique", icon: "laptop_mac" },
  { id: "ressources", label: "Ressources & E-books", icon: "library_books" }
];

export default function CatalogClient({ products, currentCategory, currentSearch, currentSort }: CatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(currentSearch || "");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/catalog?${params.toString()}`);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters('search', searchTerm);
  };

  const clearFilters = () => {
    setSearchTerm("");
    router.push('/catalog');
  };

  return (
    <div className="bg-surface text-on-background min-h-screen">
      {/* Header Section */}
      <section className="bg-surface-dim border-b border-outline-variant/30 py-12">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl">
            <h1 className="font-display text-headline-lg font-bold text-on-background mb-4">Notre Catalogue</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Explorez nos ressources pédagogiques premium et trouvez les outils parfaits pour votre réussite.</p>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <div className="flex flex-col lg:flex-row gap-lg items-start">
          
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 w-full bg-surface-container border border-outline-variant py-3 rounded-xl font-label-md text-label-md text-on-surface shadow-sm"
          >
            <span className="material-symbols-outlined">tune</span> Filtrer les résultats
          </button>

          {/* Sidebar / Filters */}
          <aside className={`
            fixed inset-0 z-50 bg-surface/95 backdrop-blur-md p-6 lg:p-0 lg:bg-transparent lg:static lg:block lg:w-72 shrink-0 overflow-y-auto lg:overflow-visible transition-transform duration-300
            ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="flex justify-between items-center lg:hidden mb-6">
              <h2 className="font-display text-headline-md font-bold text-on-background">Filtres</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)} className="w-10 h-10 flex items-center justify-center bg-surface-container rounded-full text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="glass-panel lg:rounded-3xl p-6 lg:shadow-sm space-y-8 sticky top-28">
              
              {/* Search Box */}
              <div>
                <h3 className="font-label-md text-label-md font-bold text-on-background mb-3 uppercase tracking-wider">Recherche</h3>
                <form onSubmit={handleSearch} className="relative w-full">
                  <input 
                    type="text" 
                    placeholder="Titre, mot-clé..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md"
                  />
                  <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">search</span>
                  </button>
                </form>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-label-md text-label-md font-bold text-on-background mb-4 uppercase tracking-wider">Catégories</h3>
                <ul className="space-y-2">
                  {CATEGORIES.map(category => (
                    <li key={category.id}>
                      <Link 
                        href={`/catalog?${new URLSearchParams({...Object.fromEntries(searchParams.entries()), category: category.id}).toString()}`}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all font-body-md text-body-md cursor-pointer group ${
                          currentCategory === category.id 
                            ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
                            : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                        }`}
                        scroll={false}
                      >
                        <span className="material-symbols-outlined" style={{fontVariationSettings: currentCategory === category.id ? "'FILL' 1" : "'FILL' 0"}}>{category.icon}</span>
                        {category.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 bg-surface-container text-on-surface-variant hover:text-error hover:bg-error-container font-label-md text-label-md py-3 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">clear_all</span>
                Réinitialiser les filtres
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-dim/30 p-2 rounded-2xl border border-outline-variant/30">
              <span className="font-body-md text-body-md text-on-surface-variant pl-4">
                <strong className="text-on-background">{products.length}</strong> résultats
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="font-label-md text-label-md text-on-surface-variant hidden sm:block">Trier par:</span>
                <select 
                  value={currentSort || 'recommended'}
                  onChange={(e) => updateFilters('sort', e.target.value)}
                  className="w-full sm:w-auto border border-outline-variant rounded-xl py-2 pl-4 pr-10 bg-surface font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" viewBox="0 0 24 24" stroke="%23444653" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.2em'
                  }}
                >
                  <option value="recommended">Recommandés</option>
                  <option value="price-asc">Prix Croissant</option>
                  <option value="price-desc">Prix Décroissant</option>
                  <option value="newest">Nouveautés</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {products.length === 0 ? (
              <div className="glass-panel rounded-3xl p-16 text-center border-dashed border-2 border-outline-variant/50">
                <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6 text-outline">
                  <span className="material-symbols-outlined text-[48px]">search_off</span>
                </div>
                <h3 className="font-display text-[24px] font-bold text-on-background mb-2">Aucun résultat trouvé</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">Nous n'avons trouvé aucun document correspondant à vos critères actuels. Essayez d'élargir votre recherche.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-8 px-6 py-2 bg-primary text-on-primary rounded-full font-label-md text-label-md hover:bg-primary-hover transition-colors shadow-sm"
                >
                  Effacer les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 mb-12">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant bg-surface text-on-surface disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-label-md text-label-md transition-all ${
                      currentPage === i + 1 
                        ? 'bg-primary text-on-primary shadow-md' 
                        : 'border border-outline-variant bg-surface text-on-surface hover:bg-surface-variant'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant bg-surface text-on-surface disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
