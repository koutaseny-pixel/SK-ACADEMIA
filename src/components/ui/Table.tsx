import React from "react";

export function Table({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
      <table className="w-full text-left text-sm text-gray-500">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
      {children}
    </thead>
  );
}

export function TableRow({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${className}`}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <th className={`px-6 py-4 font-bold ${className}`}>
      {children}
    </th>
  );
}

export function TableCell({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <td className={`px-6 py-4 ${className}`}>
      {children}
    </td>
  );
}
