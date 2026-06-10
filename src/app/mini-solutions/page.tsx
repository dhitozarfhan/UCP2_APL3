"use client";

import React from "react";

export default function MiniSolutionsPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-stone-50 min-h-screen text-center">
      <h1 className="text-xl font-extrabold text-stone-800 mb-6">Mini Solutions</h1>
      
      <div className="grid grid-cols-2 gap-4 max-w-md w-full">
        <div className="flex flex-col gap-1.5 text-left bg-white p-3 rounded-2xl border border-stone-200/50 shadow-2xs">
          <span className="text-[10px] font-extrabold text-stone-600">1. Latihan Napas</span>
          <video src="/videos/breathing.mp4" controls className="w-full rounded-lg" />
        </div>
        <div className="flex flex-col gap-1.5 text-left bg-white p-3 rounded-2xl border border-stone-200/50 shadow-2xs">
          <span className="text-[10px] font-extrabold text-stone-600">2. Peregangan</span>
          <video src="/videos/stretching.mp4" controls className="w-full rounded-lg" />
        </div>
        <div className="flex flex-col gap-1.5 text-left bg-white p-3 rounded-2xl border border-stone-200/50 shadow-2xs">
          <span className="text-[10px] font-extrabold text-stone-600">3. Focus Timer</span>
          <video src="/videos/focus-timer.mp4" controls className="w-full rounded-lg" />
        </div>
        <div className="flex flex-col gap-1.5 text-left bg-white p-3 rounded-2xl border border-stone-200/50 shadow-2xs">
          <span className="text-[10px] font-extrabold text-stone-600">4. Digital Detox</span>
          <video src="/videos/digital-detox.mp4" controls className="w-full rounded-lg" />
        </div>
      </div>

      <button 
        onClick={() => window.location.href = "/"}
        className="mt-8 px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold active:scale-95 transition-transform"
      >
        Kembali ke Menu Utama
      </button>
    </div>
  );
}
