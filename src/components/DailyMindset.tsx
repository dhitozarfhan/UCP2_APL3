"use client";

import React, { useState, useRef } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Quote, Heart, Share2, Sparkles, Film, Music, VolumeX, Volume2 } from "lucide-react";

interface DailyMindsetProps {
  onBackToMenu: () => void;
}

interface QuoteItem {
  id: number;
  text: string;
  author: string;
  theme: string; // gradient classes
}

const QUOTES: QuoteItem[] = [
  {
    id: 1,
    text: "Nggak apa-apa kok kalau hari ini kamu ngerasa capek banget. Baterai HP aja perlu dicas biar nggak mati total, apalagi diri kamu sendiri. Take a break, okay?",
    author: "Kakak Mentor",
    theme: "from-brand-blue-500 to-indigo-600 text-white",
  },
  {
    id: 2,
    text: "Nilai ujian itu penting, tapi kesehatan mentalmu jauh lebih berharga. Kamu itu luar biasa, dan nilai raport nggak bisa menggambarkan seberapa bernilainya dirimu.",
    author: "Anti Burnout Guide",
    theme: "from-brand-lavender-500 to-pink-600 text-white",
  },
  {
    id: 3,
    text: "Slow down. Berjalan pelan-pelan itu tetap terhitung melangkah maju kok. Nggak perlu buru-buru menyamai kecepatan orang lain di media sosial.",
    author: "Mindfulness Reminder",
    theme: "from-brand-mint-600 to-brand-blue-800 text-white",
  },
  {
    id: 4,
    text: "Kadang, hal paling produktif yang bisa kamu lakukan hari ini adalah mematikan notifikasi HP, rebahan tanpa mikirin tugas, dan mengatur napasmu. Itu bukan malas, itu memulihkan diri.",
    author: "Self-Care Bot",
    theme: "from-brand-cream-600 to-brand-cream-800 text-white",
  },
  {
    id: 5,
    text: "Kamu sedang berproses tumbuh. Kesalahan hari ini cuma satu bab kecil dari buku cerita hidupmu yang panjang dan keren. Tarik napas, mari coba lagi besok!",
    author: "Teman Curhat",
    theme: "from-red-400 to-brand-lavender-600 text-white",
  },
];

export default function DailyMindset({ onBackToMenu }: DailyMindsetProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [boostPlaying, setBoostPlaying] = useState(false);
  const boostAudioRef = useRef<HTMLAudioElement | null>(null);

  const nextQuote = () => {
    setCurrentIdx((prev) => (prev === QUOTES.length - 1 ? 0 : prev + 1));
  };

  const prevQuote = () => {
    setCurrentIdx((prev) => (prev === 0 ? QUOTES.length - 1 : prev - 1));
  };

  const toggleLike = (id: number) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert("Quote berhasil disalin ke clipboard! Bagikan ke temanmu di WhatsApp atau Instagram.");
    } else {
      alert("Fitur share disimulasikan: '" + text.substring(0, 30) + "...'");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-stone-50 overflow-y-auto no-scrollbar animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBackToMenu}
          className="p-2 bg-white hover:bg-stone-100 rounded-full shadow-xs border border-stone-200/50 text-stone-600 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-stone-800">Mindset Boost</h2>
          <p className="text-xs text-stone-500">Pemberi semangat harianmu</p>
        </div>
      </div>

      {/* Quote Carousel */}
      <div className="flex-1 flex flex-col justify-center my-4 gap-6">
        <div className="relative">
          {/* Main Card */}
          <div
            className={`w-full min-h-[220px] rounded-3xl p-6 bg-gradient-to-br ${QUOTES[currentIdx].theme} shadow-lg flex flex-col justify-between transform transition-all duration-500 scale-100`}
          >
            {/* Top icon decoration */}
            <div className="flex justify-between items-start">
              <span className="p-2 bg-white/20 backdrop-blur-xs rounded-full">
                <Quote className="w-5 h-5 text-white fill-current opacity-80" />
              </span>
              <span className="text-[10px] font-extrabold uppercase bg-black/20 text-white/90 px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-200 animate-spin" style={{ animationDuration: "3s" }} /> Quote Hari Ini
              </span>
            </div>

            {/* Quote Text */}
            <p className="text-sm font-semibold leading-relaxed tracking-wide italic my-4 text-left">
              &ldquo;{QUOTES[currentIdx].text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex justify-between items-center mt-2 border-t border-white/20 pt-3">
              <span className="text-[10px] font-bold tracking-wider opacity-80">
                — {QUOTES[currentIdx].author}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleLike(QUOTES[currentIdx].id)}
                  className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors active:scale-90"
                  title="Sukai"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${liked[QUOTES[currentIdx].id] ? "text-red-400 fill-current" : "text-white"
                      }`}
                  />
                </button>
                <button
                  onClick={() => handleShare(QUOTES[currentIdx].text)}
                  className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors active:scale-90"
                  title="Bagikan"
                >
                  <Share2 className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-4 px-2">
            <button
              onClick={prevQuote}
              className="p-2 bg-white hover:bg-stone-100 rounded-full border border-stone-200 text-stone-600 transition-colors shadow-2xs active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest">
              {currentIdx + 1} / {QUOTES.length}
            </span>
            <button
              onClick={nextQuote}
              className="p-2 bg-white hover:bg-stone-100 rounded-full border border-stone-200 text-stone-600 transition-colors shadow-2xs active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Multimedia Section */}
      <div className="space-y-4">
        {/* Short Video Motivation */}
        <div className="bg-white border border-stone-200/50 rounded-2xl p-4 shadow-2xs">
          <h4 className="text-xs font-bold text-stone-800 mb-2.5 flex items-center gap-1.5">
            <Film className="w-4 h-4 text-brand-blue-500" /> Vlog Motivasi 1 Menit
          </h4>
          <video src="/videos/motivasi.mp4" controls autoPlay muted />
        </div>

        {/* Calming BGM for Quotes */}
        <div className="bg-white border border-stone-200/50 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-brand-lavender-50 text-brand-lavender-600 rounded-xl">
                <Music className={`w-4 h-4 ${boostPlaying ? "animate-pulse" : ""}`} />
              </span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-stone-800">Quotes Background Music</h4>
                <p className="text-[10px] text-stone-500">Track: Piano Lofi Sedih</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (boostAudioRef.current) {
                  try {
                    if (boostPlaying) {
                      boostAudioRef.current.pause();
                    } else {
                      boostAudioRef.current.play().catch((err) => console.log("Boost audio blocked", err));
                    }
                  } catch (err) {
                    console.warn("Boost audio play/pause failed", err);
                  }
                }
                setBoostPlaying(!boostPlaying);
              }}
              className="p-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-700 transition-colors cursor-pointer"
            >
              {boostPlaying ? <Volume2 className="w-4 h-4 text-brand-lavender-600 animate-pulse" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            </button>
          </div>
          {/* MULTIMEDIA: AUDIO BACKGROUND MUSIC (piano-lofi-sedih.mp3 di public/audio/) */}
          <audio
            src="/audio/piano-lofi-sedih.mp3"
            ref={boostAudioRef}
            loop
            onPlay={() => setBoostPlaying(true)}
            onPause={() => setBoostPlaying(false)}
          />
        </div>
      </div>
    </div>
  );
}
