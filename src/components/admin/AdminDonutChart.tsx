"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#1b508f", "#f97316", "#8b5cf6", "#10b981", "#ec4899"];

interface DonutData {
  name: string;
  value: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-xl rounded-xl p-3 border border-gray-100 text-sm">
        <p className="font-bold text-gray-900">{payload[0].name}</p>
        <p className="font-black text-[#1b508f]">{payload[0].value.toLocaleString("fr-SN")} F</p>
      </div>
    );
  }
  return null;
};

export default function AdminDonutChart({
  data,
  totalRevenue,
}: {
  data: DonutData[];
  totalRevenue: number;
}) {
  const hasData = data.length > 0 && totalRevenue > 0;

  // Placeholder data if no sales yet
  const chartData = hasData
    ? data
    : [{ name: "Aucune donnée", value: 1 }];
  const chartColors = hasData ? COLORS : ["#e5e7eb"];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Revenus par Catégorie</h3>
        <p className="text-gray-400 text-sm mt-0.5">Répartition des ventes payées</p>
      </div>

      <div className="relative flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={hasData ? 4 : 0}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            {hasData && <Tooltip content={<CustomTooltip />} />}
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</p>
          <p className="text-lg font-black text-gray-900 mt-0.5">
            {totalRevenue > 0
              ? totalRevenue >= 1000000
                ? `${(totalRevenue / 1000000).toFixed(1)}M`
                : `${Math.round(totalRevenue / 1000)}k`
              : "0"} F
          </p>
        </div>
      </div>

      {/* Legend */}
      {hasData && (
        <div className="mt-4 space-y-2">
          {data.map((item, idx) => {
            const pct = totalRevenue > 0 ? Math.round((item.value / totalRevenue) * 100) : 0;
            return (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-gray-600 font-medium">{item.name}</span>
                </div>
                <span className="font-black text-gray-900">{pct}%</span>
              </div>
            );
          })}
        </div>
      )}

      {!hasData && (
        <p className="text-center text-sm text-gray-400 mt-4">
          Les données apparaîtront après les premières ventes validées.
        </p>
      )}
    </div>
  );
}
