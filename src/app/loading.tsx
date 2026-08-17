"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6 animate-pulse">
        <div className="w-20 h-20 rounded-2xl bg-blue-900 flex items-center justify-center text-white shadow-xl">
          <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight">SK ACADEMIA</h2>
          <p className="text-sm font-medium text-gray-500 mt-2">Chargement de votre site...</p>
        </div>
        <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-orange-500 rounded-full animate-marquee"></div>
        </div>
      </div>
    </div>
  );
}
