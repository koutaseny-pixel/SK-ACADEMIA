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
  badge?: string;
  preview_url?: string;
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

  const defaultImage = product.category?.toLowerCase().includes("informatique") 
    ? "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    : "https://images.unsplash.com/photo-1571260894064-6e13d8e5d790?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"; 

  const getCategoryTheme = (name: string, category: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("ena")) return { bg: "bg-[#00288e]", text: "text-[#00288e]", light: "bg-[#00288e]/10" };
    if (lowerName.includes("douane")) return { bg: "bg-[#ba1a1a]", text: "text-[#ba1a1a]", light: "bg-[#ba1a1a]/10" };
    if (lowerName.includes("police")) return { bg: "bg-[#7f3500]", text: "text-[#7f3500]", light: "bg-[#7f3500]/10" };
    
    if (category.toLowerCase() === "formation") return { bg: "bg-[#0058be]", text: "text-[#0058be]", light: "bg-[#0058be]/10" };
    if (category.toLowerCase() === "ressources") return { bg: "bg-[#3755c3]", text: "text-[#3755c3]", light: "bg-[#3755c3]/10" };
    return { bg: "bg-[#00288e]", text: "text-[#00288e]", light: "bg-[#00288e]/10" };
  };

  const theme = getCategoryTheme(product.name, product.category);

  return (
    <div className="group glass-card rounded-3xl overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-all duration-300">
      <Link href={`/catalog/${product.id}`} className="block relative h-56 bg-surface-container overflow-hidden">
         <img 
            src={product.image_url || defaultImage} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
         
         {product.badge && (
           <div className={`absolute top-4 right-4 ${theme.bg} text-white font-caption text-caption font-bold px-3 py-1.5 rounded-lg shadow-sm tracking-wide`}>
             {product.badge}
           </div>
         )}
      </Link>
      
      <div className="p-6 flex flex-col flex-grow bg-surface/50 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-3">
          <span className={`font-caption text-caption font-bold ${theme.text} ${theme.light} px-2.5 py-1 rounded-md uppercase tracking-wider`}>
            {product.category}
          </span>
        </div>
        
        <Link href={`/catalog/${product.id}`} className="hover:text-primary transition-colors">
          <h3 className="font-display text-[20px] font-bold text-on-background leading-tight mb-2 line-clamp-2">{product.name}</h3>
        </Link>
        
        <div className="mt-auto pt-6 flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <span className="font-display text-[24px] font-bold text-primary">
              {Number(product.price).toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
            </span>
          </div>
          
          <button 
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 font-label-md text-label-md py-3.5 px-4 rounded-xl transition-all shadow-sm
              ${added 
                ? 'bg-[#1b5e20] text-white' // Green for success
                : `${theme.bg} text-white hover:opacity-90 hover:shadow-md active:scale-[0.98]`
              }`}
          >
            {added ? (
              <><span className="material-symbols-outlined text-[20px]">check_circle</span> Ajouté</>
            ) : (
              <><span className="material-symbols-outlined text-[20px]">shopping_cart</span> Ajouter au panier</>
            )}
          </button>
          
          {product.preview_url && (
            <a 
              href={product.preview_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 font-label-md text-label-md py-3 px-4 rounded-xl border border-outline-variant bg-surface text-on-surface hover:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">visibility</span> Aperçu gratuit
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
