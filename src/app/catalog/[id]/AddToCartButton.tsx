"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { Product } from "@/components/ui/ProductCard";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      className={`w-full md:w-auto flex items-center justify-center gap-3 font-label-md text-label-md py-4 px-8 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-1
        ${added 
          ? 'bg-[#1b5e20] text-white shadow-green-500/20' 
          : 'bg-primary text-on-primary'
        }`}
    >
      {added ? (
        <>
          <span className="material-symbols-outlined text-[24px]">check_circle</span>
          Ajouté au panier !
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
          Ajouter au panier
        </>
      )}
    </button>
  );
}
