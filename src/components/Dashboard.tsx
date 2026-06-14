"use client";

import React from "react";
import { 
  Activity, 
  BookOpen, 
  Wind, 
  Smile, 
  Zap, 
  CheckSquare, 
  Sparkles,
  ChevronRight
} from "lucide-react";

interface DashboardProps {
  onNavigate: (tabId: "quiz" | "info" | "solutions" | "mood" | "boost" | "checklist") => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const menuItems = [
    {
      id: "quiz" as const,
      title: "Burnout Check",
      desc: "Cek tingkat kejenuhan belajar & stres mentalmu.",
      icon: <Activity className="w-5 h-5 text-brand-blue-500" />,
      color: "bg-brand-blue-50 border-brand-blue-100 hover:bg-brand-blue-100/50",
    },
    {
      id: "info" as const,
      title: "Kenali Burnout",
      desc: "Ketahui pengertian, penyebab, & dampak lelah mental.",
      icon: <BookOpen className="w-5 h-5 text-brand-lavender-500" />,
      color: "bg-brand-lavender-50 border-brand-lavender-100 hover:bg-brand-lavender-100/50",
    },
    {
      id: "solutions" as const,
      title: "Mini Solutions",
      desc: "Napas tenang, focus timer, dan stretching relaksasi.",
      icon: <Wind className="w-5 h-5 text-brand-mint-600" />,
      color: "bg-brand-mint-50 border-brand-mint-100 hover:bg-brand-mint-100/50",
    },
    {
      id: "mood" as const,
      title: "Mood Tracker",
      desc: "Catat perasaan harian & pantau kalender emosimu.",
      icon: <Smile className="w-5 h-5 text-brand-cream-600" />,
      color: "bg-brand-cream-50 border-brand-cream-100 hover:bg-brand-cream-100/50",
    },
    {
      id: "boost" as const,
      title: "Mindset Boost",
      desc: "Asupan quotes motivasi & video penyemangat harian.",
      icon: <Zap className="w-5 h-5 text-red-500" />,
      color: "bg-rose-50 border-rose-100 hover:bg-rose-100/50",
    },
    {
      id: "checklist" as const,
      title: "Self-Care Checklist",
      desc: "Rutinitas sehat harian untuk menjaga energimu.",
      icon: <CheckSquare className="w-5 h-5 text-emerald-600" />,
      color: "bg-emerald-50 border-emerald-100 hover:bg-emerald-100/50",
    },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 bg-stone-50 overflow-y-auto no-scrollbar animate-fade-in pb-20">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-6 pb-7 text-white shadow-md mb-6 relative">
        {/* Decorative background elements - pointer-events-none so they don't block text */}
        <div className="absolute right-2 top-2 opacity-[0.08] pointer-events-none select-none">
          <Sparkles className="w-28 h-28 text-white" />
        </div>
        <span className="inline-flex items-center text-[10px] font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full text-brand-blue-100">
          Ruang Aman Digitalmu 🌿
        </span>
        <h2 className="text-lg font-black mt-3 leading-snug">Halo Teman Hebat!</h2>
        <p className="text-xs text-stone-300 leading-relaxed mt-1.5 max-w-[85%]">
          Sudahkah kamu menyayangi dirimu sendiri hari ini? Pilih salah satu petualangan di bawah untuk memulai healing journey-mu.
        </p>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 flex flex-col gap-4">
        <h3 className="text-xs font-black text-stone-500 uppercase tracking-wider">
          Menu Utama Self-Healing
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left p-4 rounded-2xl border flex items-center justify-between transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-2xs ${item.color}`}
            >
              <div className="flex items-center gap-3.5">
                <span className="p-3 bg-white rounded-xl shadow-3xs shrink-0">
                  {item.icon}
                </span>
                <div>
                  <h4 className="text-xs font-black text-stone-800">{item.title}</h4>
                  <p className="text-[10px] text-stone-500 leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>
      
      {/* Friendly Teen footer reminder */}
      <p className="text-[10px] text-stone-400 text-center italic mt-6">
        &ldquo;Satu langkah kecil lebih baik daripada diam menumpuk lelah.&rdquo;
      </p>
    </div>
  );
}
