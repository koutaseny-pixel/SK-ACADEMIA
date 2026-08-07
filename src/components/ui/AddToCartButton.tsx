"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

interface ProductData {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
}

export default function AddToCartButton({ product }: { product: ProductData }) {
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
      className={`flex-1 font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg
        ${added 
          ? 'bg-green-500 hover:bg-green-600 text-white' 
          : 'bg-accent hover:bg-accent-hover text-white'
        }`}
    >
      <ShoppingCart size={24} />
      {added ? "Added to Cart!" : "Add to Cart"}
    </button>
  );
}
