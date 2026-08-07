import Link from "next/link";
import { Mail, Globe, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-secondary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SK ACADEMIA</h3>
            <p className="text-gray-400 text-sm">
              Empowering students in Senegal and beyond with top-tier educational resources, study guides, and online courses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/catalog" className="hover:text-accent transition-colors">Catalog</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link href="/dashboard" className="hover:text-accent transition-colors">My Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors" title="Facebook"><Globe size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors" title="Twitter"><MessageCircle size={20} /></a>
            </div>
            <a href="mailto:support@skacademia.sn" className="text-sm text-gray-400 hover:text-accent flex items-center gap-2 transition-colors">
              <Mail size={16} /> support@skacademia.sn
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} SK Academia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
