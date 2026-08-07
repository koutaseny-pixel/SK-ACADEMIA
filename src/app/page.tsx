import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";

export default function Home() {
  const featuredProducts = [
    { id: "1", name: "Complete Math Guide for BAC 2026", category: "Study Guide", price: 5000, image_url: "" },
    { id: "2", name: "Physics Past Papers (2015-2025)", category: "Past Papers", price: 3500, image_url: "" },
    { id: "3", name: "Mastering Chemistry PDF Course", category: "Ebook", price: 7000, image_url: "" },
    { id: "4", name: "Intensive Philosophy Training", category: "Online Course", price: 15000, image_url: "" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Excel in Your Exams with <span className="text-accent">SK Academia</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            The #1 educational platform in Senegal for high school and university students. Get top-tier study guides, past papers, and expert courses.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/catalog" className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-md transition-colors text-lg">
              Explore Catalog
            </Link>
            <Link href="/about" className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-md transition-colors text-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Resources</h2>
              <p className="text-gray-600 mt-2">Hand-picked materials to boost your grades.</p>
            </div>
            <Link href="/catalog" className="text-primary font-medium hover:underline hidden sm:block">
              View all &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/catalog" className="text-primary font-medium hover:underline">
              View all &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Trusted by Thousands of Students in Senegal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl font-black text-accent mb-2">10k+</div>
              <div className="text-gray-600 font-medium">Active Students</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-accent mb-2">500+</div>
              <div className="text-gray-600 font-medium">Resources Available</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-accent mb-2">98%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
