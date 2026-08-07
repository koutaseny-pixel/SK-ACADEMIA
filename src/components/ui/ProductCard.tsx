import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">
      <Link href={`/catalog/${product.id}`} className="block relative h-48 bg-gray-200">
        {/* Placeholder for actual next/image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
          <span className="text-sm">Image: {product.title}</span>
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">{product.category}</span>
        <Link href={`/catalog/${product.id}`} className="hover:text-primary transition-colors">
          <h3 className="font-bold text-gray-900 leading-tight mb-2 line-clamp-2">{product.title}</h3>
        </Link>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-bold text-lg text-primary">{product.price.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}</span>
          <button className="bg-primary/10 text-primary hover:bg-primary hover:text-white p-2 rounded-full transition-colors" aria-label="Add to cart">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
