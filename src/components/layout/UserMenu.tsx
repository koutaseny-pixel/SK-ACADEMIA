"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface UserMenuProps {
  user: any;
  role?: 'admin' | 'customer' | null;
}

export default function UserMenu({ user, role }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-[#1b508f] hover:bg-blue-200 transition-colors border-2 border-transparent focus:border-[#1b508f] outline-none font-bold"
      >
        {user.email ? user.email.charAt(0).toUpperCase() : <User size={20} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
            {role === 'admin' && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-full uppercase tracking-wider">
                Administrateur
              </span>
            )}
          </div>
          
          <div className="py-1">
            <Link 
              href="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium"
            >
              <LayoutDashboard size={16} /> Mon Espace
            </Link>

            <Link 
              href="/dashboard/settings" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium"
            >
              <User size={16} /> Mon Profil
            </Link>
            
            {role === 'admin' && (
              <Link 
                href="/admin" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1b508f] transition-colors font-medium"
              >
                <Settings size={16} /> Administration
              </Link>
            )}
          </div>
          
          <div className="py-1 border-t border-gray-100">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
            >
              <LogOut size={16} /> Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
