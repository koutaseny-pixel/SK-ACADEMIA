"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden flex items-center">
      <button 
        onClick={toggleMenu} 
        className="text-[#1b508f] p-2 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <span className="text-xl font-black tracking-tight text-[#1b508f]">MENU</span>
          <button onClick={closeMenu} className="text-gray-500 hover:text-orange-500">
             <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto flex flex-col">
          <Link href="/" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-xl transition-colors">
            Accueil
          </Link>
          <Link href="/catalog" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-xl transition-colors">
            Boutique
          </Link>
          <Link href="/catalog?category=prepa" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-xl transition-colors">
            Préparation Concours
          </Link>
          <Link href="/catalog?category=formation" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-xl transition-colors">
            Formations Informatique
          </Link>
          <Link href="/about" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-xl transition-colors">
            À Propos
          </Link>
          <Link href="/contact" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-xl transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}
