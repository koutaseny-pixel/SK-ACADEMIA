import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const menuItems = [
    { name: "Vue d'ensemble", icon: LayoutDashboard, href: "/admin" },
    { name: "Produits", icon: Package, href: "/admin/products" },
    { name: "Commandes", icon: ShoppingCart, href: "/admin/orders" },
    { name: "Clients", icon: Users, href: "/admin/customers" },
    { name: "Paramètres", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-20">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-800">
        <Link href="/admin" className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <span className="text-white">SK</span>
          <span className="text-orange-500">ADMIN</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors group"
            >
              <Icon size={20} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-800">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-lg transition-colors hover:bg-gray-800"
        >
          <LogOut size={20} />
          <span className="font-medium">Retour au site</span>
        </Link>
      </div>
    </div>
  );
}
