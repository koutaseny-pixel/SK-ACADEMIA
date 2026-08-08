"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Lun", revenus: 4000, ventes: 24 },
  { name: "Mar", revenus: 3000, ventes: 18 },
  { name: "Mer", revenus: 2000, ventes: 12 },
  { name: "Jeu", revenus: 2780, ventes: 16 },
  { name: "Ven", revenus: 1890, ventes: 10 },
  { name: "Sam", revenus: 2390, ventes: 14 },
  { name: "Dim", revenus: 3490, ventes: 22 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full h-full min-h-[400px]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Aperçu des Revenus</h3>
        <p className="text-gray-500 text-sm">Évolution sur les 7 derniers jours</p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `${value}k`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#111827', fontWeight: 'bold' }}
              labelStyle={{ color: '#6b7280', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenus" 
              stroke="#f97316" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenus)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
