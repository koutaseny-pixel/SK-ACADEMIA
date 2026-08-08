import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
}

export default function StatCard({ title, value, change, isPositive, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
          <Icon className="text-orange-500" size={24} />
        </div>
        <div className={`text-sm font-bold px-2 py-1 rounded-full flex items-center gap-1
          ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}
        `}>
          {isPositive ? '+' : ''}{change}
        </div>
      </div>
      <div>
        <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
        <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
