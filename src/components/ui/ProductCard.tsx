"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
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

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col h-full">
      <Link href={`/catalog/${product.id}`} className="block relative h-48 bg-gray-100 flex items-center justify-center text-gray-400">
         {/* Placeholder for actual next/image */}
         <span className="text-sm font-medium">Image: {product.name}</span>
      </Link>
      <div className="p-5 flex flex-col flex-grow text-center">
        <span className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{product.category}</span>
        <Link href={`/catalog/${product.id}`} className="hover:text-primary transition-colors">
          <h3 className="font-bold text-gray-900 leading-tight mb-2 line-clamp-2">{product.name}</h3>
        </Link>
        <div className="mt-auto pt-4 flex flex-col items-center">
          <span className="font-black text-xl text-[#1b508f] mb-4">
            {product.price.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
          </span>
          <button 
            onClick={handleAdd}
            className={`w-full font-bold py-3 px-4 rounded transition-colors text-sm
              ${added 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-[#1b508f] hover:bg-blue-800 text-white'
              }`}
          >
            {added ? "AJOUTÉ !" : "AJOUTER AU PANIER"}
          </button>
        </div>
      </div>
    </div>
  );
}
