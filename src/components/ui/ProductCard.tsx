"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url?: string;
  badge?: string; // Optional badge like "Nouveau", "Promo"
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Determine a placeholder image based on category
  // Determine a placeholder image based on category
  const defaultImage = product.category?.toLowerCase().includes("informatique") 
    ? "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" // Black women working on laptop
    : "https://images.unsplash.com/photo-1571260894064-6e13d8e5d790?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"; // African students

  // Determine dynamic colors for categories / concours
  const getCategoryColor = (name: string, category: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("ena")) return "bg-blue-600";
    if (lowerName.includes("douane")) return "bg-yellow-600";
    if (lowerName.includes("police")) return "bg-red-600";
    if (lowerName.includes("gendarmerie")) return "bg-green-700";
    if (lowerName.includes("fastef")) return "bg-purple-600";
    
    if (category.toLowerCase() === "formation") return "bg-indigo-600";
    if (category.toLowerCase() === "ressources") return "bg-teal-600";
    return "bg-orange-500";
  };

  const badgeColorClass = getCategoryColor(product.name, product.category);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
      <Link href={`/catalog/${product.id}`} className="block relative h-48 bg-gray-100 overflow-hidden">
         <img 
            src={product.image_url || defaultImage} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
         />
         {product.badge && (
           <div className={`absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide ${badgeColorClass}`}>
             {product.badge}
           </div>
         )}
      </Link>
      <div className="p-6 flex flex-col flex-grow text-center">
        <span className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{product.category}</span>
        <Link href={`/catalog/${product.id}`} className="hover:text-orange-500 transition-colors">
          <h3 className="font-bold text-gray-900 leading-tight mb-2 line-clamp-2">{product.name}</h3>
        </Link>
        <div className="mt-auto pt-4 flex flex-col items-center">
          <span className="font-black text-xl text-[#1b508f] mb-4">
            {Number(product.price).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
          </span>
          <button 
            onClick={handleAdd}
            className={`w-full font-bold py-3 px-4 rounded-xl transition-all text-sm shadow-md text-white
              ${added 
                ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' 
                : `${badgeColorClass} hover:opacity-90 shadow-black/10`
              }`}
          >
            {added ? "AJOUTÉ !" : "AJOUTER AU PANIER"}
          </button>
        </div>
      </div>
    </div>
  );
}
