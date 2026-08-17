"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0f1c] text-white">
      {/* Decorative ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center animate-in fade-in duration-1000 zoom-in-95">
        
        {/* Animated Logo */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-t-blue-400 border-r-blue-400 animate-[spin_2s_linear_infinite]" />
          
          {/* Inner pulsating ring */}
          <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-transparent border-b-orange-400 border-l-orange-400 animate-[spin_1.5s_linear_infinite_reverse]" />
          
          {/* Center Icon */}
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
            <span className="material-symbols-outlined text-white text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>
              school
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white drop-shadow-sm">
            SK ACADEMIA
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-blue-200/80 font-medium tracking-widest text-sm uppercase">
            <span>Chargement</span>
            <span className="flex gap-1">
              <span className="animate-[bounce_1s_infinite_0ms] block w-1 h-1 bg-orange-400 rounded-full" />
              <span className="animate-[bounce_1s_infinite_200ms] block w-1 h-1 bg-orange-400 rounded-full" />
              <span className="animate-[bounce_1s_infinite_400ms] block w-1 h-1 bg-orange-400 rounded-full" />
            </span>
          </div>
        </div>

        {/* Progress bar line */}
        <div className="w-48 h-px bg-white/10 mt-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[marquee_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
