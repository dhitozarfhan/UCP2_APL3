"use client";

import React from "react";
import { Sparkles, Play, Volume2, VolumeX, ArrowRight } from "lucide-react";

interface OpeningScreenProps {
  onEnter: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

export default function OpeningScreen({ onEnter, isMuted, toggleMute }: OpeningScreenProps) {
  const handleEnterClick = () => {
    try {
      onEnter();
    } catch (err) {
      console.error("onEnter failed", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-brand-blue-50 via-brand-cream-50 to-brand-lavender-50 animate-fade-in">
      {/* Header Info */}
      <div className="flex justify-between items-center mt-2">
        <span className="flex items-center gap-1 text-xs font-semibold text-brand-blue-800 bg-brand-blue-100 px-3 py-1 rounded-full">
          <Sparkles className="w-3 animate-pulse text-brand-blue-500" /> Anti Burnout Junior v1.0
        </span>
        <button
          onClick={toggleMute}
          className="p-2 bg-white/80 backdrop-blur-xs hover:bg-white rounded-full shadow-xs border border-stone-200/30 text-stone-600 transition-all active:scale-95 cursor-pointer"
          title={isMuted ? "Mainkan Musik" : "Senapkan Musik"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-brand-blue-600 animate-bounce" />}
        </button>
      </div>

      {/* Hero Content */}
      <div className="my-auto text-center flex flex-col items-center gap-3">
        {/* MULTIMEDIA: LOGO APLIKASI (logo-antiburnout.png) */}
        <div className="w-full flex justify-center mb-1">
          <img
            src="/images/logo-antiburnout.png"
            alt="Logo Anti Burnout Junior"
            className="w-16 h-16 object-cover rounded-2xl shadow-lg border border-stone-200/50 transform rotate-6 animate-float mb-1"
          />
        </div>

        <h1 className="text-xl font-extrabold tracking-tight text-stone-800">
          Anti Burnout
          <span className="block text-sm font-medium text-brand-blue-800 mt-0.5">Junior</span>
        </h1>

        <p className="text-[10px] font-bold tracking-wide text-brand-lavender-800 uppercase">
          &ldquo;Belajar Menghadapi Hidup Tanpa Burnout&rdquo;
        </p>

        {/* MULTIMEDIA: ILUSTRASI MEJA BELAJAR / BURNOUT */}
        <div className="w-full max-w-[280px] h-24 rounded-xl overflow-hidden shadow-2xs border border-stone-200/40 my-1 bg-white flex items-center justify-center">
          <img
            src="/images/meja-belajar.jpg"
            alt="Ilustrasi Suasana Meja Belajar Penuh Buku"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&q=80";
            }}
          />
        </div>

        <p className="text-[11px] text-stone-600 max-w-xs leading-relaxed">
          Selamat datang di ruang aman digitalmu. Tempat belajar santai mengenali lelah mental, menenangkan pikiran, dan menjaga semangat belajar tetap menyala.
        </p>

        {/* Video Container */}
        <div className="w-full bg-white/70 backdrop-blur-xs border border-stone-200/50 rounded-2xl p-2.5 shadow-xs mt-3 group">
          <video src="/videos/intro.mp4" autoPlay muted loop playsInline className="w-full rounded-2xl" />
          <p className="text-[9px] text-stone-400 mt-1.5 text-center">
            * Video: Remaja & Burnout | Audio Calming BGM: Aktif
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-auto pb-2">
        <button
          onClick={handleEnterClick}
          className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-[0.98] group cursor-pointer"
        >
          Mulai Perjalanan
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
