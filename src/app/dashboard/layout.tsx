import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Download, Settings, LogOut, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName = user?.user_metadata?.first_name
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`.trim()
    : user?.email?.split("@")[0] || "Étudiant";

  const navLinks = [
    { href: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
    { href: "/dashboard/orders", label: "Mes Commandes", icon: ShoppingBag },
    { href: "/dashboard/downloads", label: "Mes Téléchargements", icon: Download },
    { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            {/* User info */}
            <div className="bg-gradient-to-br from-[#1b508f] to-blue-700 p-5">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white text-xl font-black mb-3">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <p className="font-bold text-white truncate">{displayName}</p>
              <p className="text-blue-200 text-xs mt-0.5 truncate">{user.email}</p>
              <span className="inline-block mt-2 bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                Étudiant
              </span>
            </div>

            <nav className="p-3 space-y-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-[#1b508f] transition-colors font-medium text-sm group"
                >
                  <link.icon size={18} className="group-hover:scale-110 transition-transform" />
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 mt-2 border-t border-gray-100">
                <Link
                  href="/catalog"
                  className="flex items-center gap-3 px-4 py-3 text-gray-500 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium text-sm"
                >
                  <BookOpen size={18} />
                  Explorer la boutique
                </Link>
                <form action="/auth/signout" method="POST">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 rounded-xl hover:bg-red-50 transition-colors font-medium text-sm"
                  >
                    <LogOut size={18} />
                    Déconnexion
                  </button>
                </form>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
