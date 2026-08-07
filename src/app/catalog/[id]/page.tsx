import { ShoppingCart, Check, Star } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Mock product data
  const product = {
    id,
    title: "Complete Math Guide for BAC 2026",
    category: "Study Guide",
    price: 5000,
    description: "This comprehensive guide covers all the essential topics for the BAC 2026 Mathematics exam. Includes step-by-step solutions, practice questions, and exam strategies tailored for Senegalese students.",
    features: [
      "Over 500 practice questions",
      "Detailed step-by-step solutions",
      "Past papers from 2010 to 2024",
      "Printable PDF format"
    ],
    rating: 4.8,
    reviews: 124
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">Home</Link> &gt;{" "}
        <Link href="/catalog" className="hover:text-primary">Catalog</Link> &gt;{" "}
        <span className="text-gray-900">{product.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100">
        {/* Product Image placeholder */}
        <div className="lg:w-1/2">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400">
            [Product Image / Cover]
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 flex flex-col">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.title}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-gray-600 font-medium">{product.rating}</span>
            <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
          </div>

          <div className="text-4xl font-bold text-primary mb-6">
            {product.price.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
          </div>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">What's included:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-100 flex gap-4">
            <button className="flex-1 bg-accent hover:bg-accent-hover text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg">
              <ShoppingCart size={24} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
