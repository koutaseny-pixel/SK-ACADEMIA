"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

interface DataPoint {
  name: string;
  revenus: number;
  commandes: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-xl rounded-xl p-4 border border-gray-100 text-sm">
        <p className="font-bold text-gray-700 mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }} className="font-bold">
            {entry.name === "revenus"
              ? `Revenus : ${entry.value.toLocaleString("fr-SN")} F`
              : `Commandes : ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminRevenueChart({ data }: { data: DataPoint[] }) {
  const maxRevenue = Math.max(...data.map(d => d.revenus), 1);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Évolution des Revenus</h3>
          <p className="text-gray-400 text-sm mt-0.5">Sur les 6 derniers mois</p>
        </div>
        <div className="flex gap-4 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="w-3 h-3 rounded-full bg-[#1b508f] inline-block" /> Revenus (F CFA)
          </span>
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> Commandes
          </span>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1b508f" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#1b508f" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCommandes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 600 }}
              dy={8}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              tickFormatter={(v) => v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenus"
              stroke="#1b508f"
              strokeWidth={2.5}
              fill="url(#colorRevenus)"
              dot={{ r: 4, fill: "#1b508f", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#1b508f" }}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="commandes"
              stroke="#f97316"
              strokeWidth={2.5}
              fill="url(#colorCommandes)"
              dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#f97316" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
