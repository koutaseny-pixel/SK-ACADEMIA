import { Settings, Download, ShoppingBag, LogOut } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-primary text-secondary">
            <h2 className="font-bold text-xl">My Account</h2>
            <p className="text-sm text-primary-200 mt-1">student@example.com</p>
          </div>
          <nav className="p-2 flex flex-col gap-1">
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-primary bg-primary/10 rounded-md font-medium">
              <Download size={20} /> My Downloads
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors">
              <ShoppingBag size={20} /> Order History
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors">
              <Settings size={20} /> Settings
            </Link>
            <hr className="my-2 border-gray-100" />
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-md font-medium transition-colors">
              <LogOut size={20} /> Sign Out
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Downloads</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0"></div>
                <div>
                  <h3 className="font-bold text-gray-900">Resource Title {i}</h3>
                  <p className="text-sm text-gray-500">Purchased on Aug 12, 2026</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium bg-primary/10 px-4 py-2 rounded transition-colors whitespace-nowrap">
                <Download size={18} /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
