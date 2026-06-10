"use client";

import React from "react";

export default function DailyBoostPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-stone-50 min-h-screen">
      <h1 className="text-xl font-extrabold text-stone-800 mb-4">Daily Mindset Boost</h1>
      <video src="/videos/motivasi.mp4" controls autoPlay muted className="w-full max-w-md rounded-2xl shadow-lg" />
      <button 
        onClick={() => window.location.href = "/"}
        className="mt-6 px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold active:scale-95 transition-transform"
      >
        Kembali ke Menu Utama
      </button>
    </div>
  );
}
