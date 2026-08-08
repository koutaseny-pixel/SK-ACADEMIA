"use client";

import { useState, useMemo } from "react";
import ProductCard, { Product } from "@/components/ui/ProductCard";
import { Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";

interface CatalogClientProps {
  initialProducts: Product[];
}

const CATEGORIES = ["Préparation Concours", "Formation Informatique", "Ressources & E-books"];
const LEVELS = ["Lycée", "Université", "Concours Professionnel"];

export default function CatalogClient({ initialProducts }: CatalogClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const ITEMS_PER_PAGE = 9;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) || 
        p.category?.toLowerCase().includes(lowerSearch)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category || ""));
    }

    // Since we don't have level property on our basic product yet, 
    // we'll just mock the level filter or ignore it for now unless we add it to the schema.
    // For a real app, you'd filter by p.level here.

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // Assuming newest are at the end, or we can use created_at if available
        // For now, we'll reverse the array as a mock for newest
        result.reverse();
        break;
      default:
        // recommended - original order
        break;
    }

    return result;
  }, [initialProducts, searchTerm, selectedCategories, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page
  };

  const handleLevelToggle = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
    setCurrentPage(1);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Le Catalogue</h1>
          <p className="text-gray-500 font-medium mt-2">Découvrez nos fascicules et formations pour exceller.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Rechercher un document, un concours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 w-full bg-white border border-gray-200 py-3 rounded-xl font-bold text-gray-700 shadow-sm"
        >
          <Filter size={20} /> Filtrer les résultats
        </button>

        {/* Sidebar Filters */}
        <div className={`
          fixed inset-0 z-50 bg-white p-6 lg:p-0 lg:bg-transparent lg:static lg:block lg:w-72 shrink-0 overflow-y-auto lg:overflow-visible transition-transform duration-300
          ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex justify-between items-center lg:hidden mb-6">
            <h2 className="text-xl font-black text-gray-900">Filtres</h2>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-gray-500 bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="bg-white lg:p-6 lg:rounded-3xl lg:shadow-sm lg:border lg:border-gray-100 space-y-8">
            <div>
              <h3 className="font-black text-gray-900 mb-4 uppercase tracking-wider text-sm">Catégories</h3>
              <ul className="space-y-3">
                {CATEGORIES.map(category => (
                  <li key={category}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                        ${selectedCategories.includes(category) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300 group-hover:border-orange-400'}
                      `}>
                        {selectedCategories.includes(category) && <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                      />
                      <span className="text-gray-700 font-medium group-hover:text-gray-900">{category}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full h-px bg-gray-100"></div>

            <div>
              <h3 className="font-black text-gray-900 mb-4 uppercase tracking-wider text-sm">Niveau</h3>
              <ul className="space-y-3">
                {LEVELS.map(level => (
                  <li key={level}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                        ${selectedLevels.includes(level) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300 group-hover:border-orange-400'}
                      `}>
                        {selectedLevels.includes(level) && <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={selectedLevels.includes(level)}
                        onChange={() => handleLevelToggle(level)}
                      />
                      <span className="text-gray-700 font-medium group-hover:text-gray-900">{level}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => {
                setSelectedCategories([]);
                setSelectedLevels([]);
                setSearchTerm("");
                setIsMobileFiltersOpen(false);
              }}
              className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-gray-600 font-medium">
              <span className="font-bold text-gray-900">{filteredProducts.length}</span> documents trouvés
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-gray-500 text-sm hidden sm:block">Trier par:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto border border-gray-200 rounded-lg py-2 px-4 bg-gray-50 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-gray-700"
              >
                <option value="recommended">Recommandés</option>
                <option value="price-asc">Prix : Croissant</option>
                <option value="price-desc">Prix : Décroissant</option>
                <option value="newest">Plus Récents</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos filtres ou vos termes de recherche.</p>
              <button 
                onClick={() => {
                  setSelectedCategories([]);
                  setSearchTerm("");
                }}
                className="mt-6 text-orange-500 font-bold hover:underline"
              >
                Effacer les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-orange-500 text-white shadow-md' 
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
