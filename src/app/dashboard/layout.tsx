import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Download, Settings, LogOut } from "lucide-react";
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 truncate">{user.email}</h2>
            <p className="text-sm text-gray-500">Étudiant</p>
          </div>
          
          <nav className="space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors">
              <LayoutDashboard size={20} />
              <span className="font-medium">Vue d'ensemble</span>
            </Link>
            <Link href="/dashboard/orders" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors">
              <ShoppingBag size={20} />
              <span className="font-medium">Mes Commandes</span>
            </Link>
            <Link href="/dashboard/downloads" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors">
              <Download size={20} />
              <span className="font-medium">Mes Téléchargements</span>
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors">
              <Settings size={20} />
              <span className="font-medium">Paramètres</span>
            </Link>
            
            <div className="pt-4 mt-4 border-t border-gray-100">
              <form action="/auth/signout" method="POST">
                <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <LogOut size={20} />
                  <span className="font-medium">Déconnexion</span>
                </button>
              </form>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
