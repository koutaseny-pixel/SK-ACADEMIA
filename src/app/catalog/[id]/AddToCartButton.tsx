"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
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
      className={`w-full md:w-auto flex items-center justify-center gap-2 font-black py-4 px-8 rounded-xl transition-all text-lg shadow-xl hover:-translate-y-1
        ${added 
          ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30' 
          : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30'
        }`}
    >
      {added ? (
        <>
          <CheckCircle2 size={24} />
          Ajouté au panier !
        </>
      ) : (
        <>
          <ShoppingCart size={24} />
          Ajouter au panier
        </>
      )}
    </button>
  );
}
