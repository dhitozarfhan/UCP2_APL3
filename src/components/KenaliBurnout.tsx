"use client";

import React, { useState } from "react";
import { ArrowLeft, BookOpen, Brain, Clock, HelpCircle, Info, Sparkles, Smile } from "lucide-react";

interface KenaliBurnoutProps {
  onBackToMenu: () => void;
}

interface Symptom {
  icon: string;
  image: string;
  title: string;
  desc: string;
  color: string;
}

const SYMPTOMS: Symptom[] = [
  {
    icon: "😴",
    image: "/images/lelah-seharian.jpg",
    title: "Lelah Seharian",
    desc: "Udah tidur 8 jam tapi bangun-bangun masih kerasa lemes, mager, dan rasanya kayak kehabisan baterai.",
    color: "bg-brand-blue-50 border-brand-blue-200 text-brand-blue-800",
  },
  {
    icon: "🤯",
    image: "/images/sulit-konsentrasi.jpg",
    title: "Sulit Konsentrasi",
    desc: "Membaca satu halaman buku berkali-kali tapi nggak ada yang nyangkut di otak. Pikiran gampang buyar.",
    color: "bg-brand-lavender-50 border-brand-lavender-200 text-brand-lavender-800",
  },
  {
    icon: "🥀",
    image: "/images/hilang-semangat.svg",
    title: "Hilang Semangat",
    desc: "Hobi, game, atau ngumpul bareng temen yang biasanya seru, sekarang rasanya hambar dan males banget diikuti.",
    color: "bg-brand-cream-50 border-brand-cream-200 text-brand-cream-800",
  },
  {
    icon: "😟",
    image: "/images/mudah-cemas.svg",
    title: "Mudah Cemas",
    desc: "Sering deg-degan kepikiran nilai sekolah, takut melakukan kesalahan sekecil apa pun, atau cemas masa depan.",
    color: "bg-brand-mint-50 border-brand-mint-200 text-brand-mint-800",
  },
  {
    icon: "🦉",
    image: "/images/sulit-tidur.jpg",
    title: "Sulit Tidur",
    desc: "Pas rebahan di kasur, otak malah ramai banget mikirin ini-itu. Alhasil, jadi susah merem sampai larut malam.",
    color: "bg-indigo-50 border-indigo-200 text-indigo-800",
  },
  {
    icon: "⚡",
    image: "/images/kewalahan-tugas.svg",
    title: "Kewalahan Tugas",
    desc: "Merasa terbebani dan stres berat akibat tumpukan PR sekolah serta aktivitas belajar yang berlebihan.",
    color: "bg-red-50 border-red-200 text-red-800",
  },
];

export default function KenaliBurnout({ onBackToMenu }: KenaliBurnoutProps) {
  const [activeTab, setActiveTab] = useState<"definisi" | "penyebab" | "dampak">("definisi");
  const [selectedSymptom, setSelectedSymptom] = useState<number | null>(null);

  return (
    <div className="flex-1 flex flex-col p-6 bg-stone-50 overflow-y-auto no-scrollbar animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBackToMenu}
          className="p-2 bg-white hover:bg-stone-100 rounded-full shadow-xs border border-stone-200/50 text-stone-600 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-stone-800">Kenali Burnout</h2>
          <p className="text-xs text-stone-500">Pahami sinyal lelah mentalmu</p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex bg-stone-200/50 p-1 rounded-xl gap-1 mb-5 text-xs font-bold">
        <button
          onClick={() => setActiveTab("definisi")}
          className={`flex-1 py-2.5 rounded-lg text-center transition-all ${
            activeTab === "definisi" ? "bg-white text-stone-800 shadow-2xs" : "text-stone-500 hover:text-stone-700"
          }`}
        >
          Apa Itu?
        </button>
        <button
          onClick={() => setActiveTab("penyebab")}
          className={`flex-1 py-2.5 rounded-lg text-center transition-all ${
            activeTab === "penyebab" ? "bg-white text-stone-800 shadow-2xs" : "text-stone-500 hover:text-stone-700"
          }`}
        >
          Penyebab
        </button>
        <button
          onClick={() => setActiveTab("dampak")}
          className={`flex-1 py-2.5 rounded-lg text-center transition-all ${
            activeTab === "dampak" ? "bg-white text-stone-800 shadow-2xs" : "text-stone-500 hover:text-stone-700"
          }`}
        >
          Dampak
        </button>
      </div>

      {/* Dynamic Tab Content */}
      <div className="bg-white border border-stone-200/50 rounded-2xl p-5 shadow-2xs mb-6 min-h-[140px] flex flex-col justify-center">
        {activeTab === "definisi" && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-brand-blue-800 font-bold text-sm">
              <Info className="w-4 h-4 text-brand-blue-500" /> Pengertian Sederhana
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Burnout</strong> adalah kondisi lelah mental, fisik, dan emosional yang parah akibat stres belajar atau tekanan yang berlebihan dalam waktu lama. Rasanya kayak baterai HP-mu drop ke 1% dan susah di-charge lagi karena mesinnya udah kepanasan (overheat).
            </p>
          </div>
        )}
        {activeTab === "penyebab" && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-brand-lavender-800 font-bold text-sm">
              <Clock className="w-4 h-4 text-brand-lavender-500" /> Kenapa Bisa Terjadi?
            </div>
            <ul className="text-xs text-stone-600 list-disc pl-4 space-y-1.5">
              <li><strong>Tuntutan Belajar:</strong> Tugas sekolah yang tiada habisnya atau tekanan ekspektasi nilai.</li>
              <li><strong>Kurang Istirahat:</strong> Begadang karena scrolling medsos atau maraton nonton film.</li>
              <li><strong>Melupakan Hobi:</strong> Kehilangan waktu luang untuk sekadar bermain dan bersenang-senang.</li>
            </ul>
          </div>
        )}
        {activeTab === "dampak" && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-brand-cream-800 font-bold text-sm">
              <Brain className="w-4 h-4 text-brand-cream-600" /> Efek ke Keseharianmu
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Jika dibiarkan, burnout bikin kamu malas sekolah, nilai mendadak turun drastis, gampang bertengkar sama sahabat atau orang tua, dan daya tahan tubuh menurun sehingga gampang sakit (pusing/masuk angin).
            </p>
          </div>
        )}
      </div>

      {/* Section: Symptoms Grid (Visual & Tap interaction) */}
      <div className="mb-6">
        <h3 className="text-sm font-extrabold text-stone-700 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-brand-blue-500" /> Tanda-Tanda Kamu Burnout
        </h3>
        <p className="text-[11px] text-stone-500 mb-3">Ketuk setiap kartu untuk melihat penjelasannya!</p>
        
        <div className="grid grid-cols-2 gap-3">
          {SYMPTOMS.map((sym, idx) => {
            const isSelected = selectedSymptom === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedSymptom(isSelected ? null : idx)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all duration-300 transform active:scale-95 min-h-[100px] cursor-pointer ${
                  isSelected 
                    ? "bg-stone-900 border-stone-800 text-white col-span-2 scale-[1.01] shadow-md"
                    : sym.color
                }`}
              >
                {/* Image Illustration with Emoji Fallback */}
                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-white/50 mb-1.5 relative group">
                  <img 
                    src={sym.image} 
                    alt={sym.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="text-xl select-none absolute z-0">{sym.icon}</span>
                </div>

                <span className="text-xs font-bold">{sym.title}</span>
                {isSelected && (
                  <p className="text-[11px] text-stone-300 mt-2 leading-relaxed max-w-xs animate-fade-in">
                    {sym.desc}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Multimedia Explainers */}
      <div className="bg-white border border-stone-200/50 rounded-2xl p-4 shadow-2xs mt-4">
        <h4 className="text-xs font-bold text-stone-800 mb-2.5 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-brand-blue-500" /> Vlog Remaja & Aktivitas Sehari-hari
        </h4>
        <video src="/videos/remaja-hidup.mp4" controls className="w-full" />
      </div>
    </div>
  );
}
