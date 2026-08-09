"use client";

import React from "react";
import ProductCard from "@/components/ui/ProductCard";

interface ProductMarqueeProps {
  products: any[];
  speed?: number; // duration in seconds
}

export default function ProductMarquee({ products, speed = 40 }: ProductMarqueeProps) {
  // We duplicate the array to create a seamless infinite scroll effect
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <div className="relative flex overflow-x-hidden group py-4">
      <div 
        className="animate-marquee flex gap-6 min-w-full"
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedProducts.map((product, index) => (
          <div key={`${product.id}-${index}`} className="w-[280px] sm:w-[320px] shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {/* Optional fade edges for better blending */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-gray-50 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-gray-50 to-transparent"></div>
    </div>
  );
}
