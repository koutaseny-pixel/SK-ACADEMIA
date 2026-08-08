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
  const defaultImage = product.category?.toLowerCase().includes("informatique") 
    ? "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    : "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
      <Link href={`/catalog/${product.id}`} className="block relative h-48 bg-gray-100 overflow-hidden">
         <img 
            src={product.image_url || defaultImage} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
         />
         {product.badge && (
           <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
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
            {product.price.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
          </span>
          <button 
            onClick={handleAdd}
            className={`w-full font-bold py-3 px-4 rounded-xl transition-all text-sm shadow-md
              ${added 
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20' 
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20'
              }`}
          >
            {added ? "AJOUTÉ !" : "AJOUTER AU PANIER"}
          </button>
        </div>
      </div>
    </div>
  );
}
