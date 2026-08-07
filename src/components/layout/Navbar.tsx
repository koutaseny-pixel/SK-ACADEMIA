import Link from "next/link";
import CartBadge from "@/components/ui/CartBadge";

export default function Navbar() {
  return (
    <nav className="bg-primary text-secondary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-2xl tracking-tight">
              SK ACADEMIA
            </Link>
            <div className="hidden md:flex space-x-6 text-sm font-medium">
              <Link href="/catalog" className="hover:text-accent transition-colors">Catalog</Link>
              <Link href="/about" className="hover:text-accent transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CartBadge />
            <Link href="/login" className="hidden md:inline-flex bg-secondary text-primary hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
