import { Bell, Search } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      
      {/* Search */}
      <div className="relative w-96">
        <input 
          type="text" 
          placeholder="Rechercher (commandes, produits...)"
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900">Admin SK</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
