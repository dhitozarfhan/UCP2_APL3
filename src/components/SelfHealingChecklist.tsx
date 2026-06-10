"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckSquare, Square, Award, Info, RefreshCw } from "lucide-react";

interface SelfHealingChecklistProps {
  onBackToMenu: () => void;
}

interface ChecklistItem {
  id: string;
  title: string;
  desc: string;
  image: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "sleep",
    title: "Tidur Cukup (7-8 jam)",
    desc: "Memulihkan stamina fisik dan menyegarkan sel-sel otak setelah seharian belajar.",
    image: "/images/checklist/tidur.png",
  },
  {
    id: "water",
    title: "Minum Air Putih (8 Gelas)",
    desc: "Menghindari dehidrasi yang sering jadi penyebab rahasia pusing dan badan loyo.",
    image: "/images/checklist/minum.png",
  },
  {
    id: "exercise",
    title: "Olahraga Ringan (15 Menit)",
    desc: "Bisa peregangan, jalan kaki santai, atau sepedaan. Melepaskan hormon bahagia (endorfin)!",
    image: "/images/checklist/olahraga.png",
  },
  {
    id: "detox",
    title: "Digital Detox (Min. 1 Jam)",
    desc: "Matikan HP atau taruh di ruangan lain. Bebaskan pikiran dari notifikasi medsos.",
    image: "/images/checklist/gadget.png",
  },
  {
    id: "journal",
    title: "Ekspresi Diri / Curhat",
    desc: "Tulis di jurnal harian atau mengobrol santai 10 menit dengan teman/orang tua terdekat.",
    image: "/images/checklist/gadget.png",
  },
];

export default function SelfHealingChecklist({ onBackToMenu }: SelfHealingChecklistProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [todayDateStr, setTodayDateStr] = useState("");

  useEffect(() => {
    // Determine today's date key: YYYY-MM-DD
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    setTodayDateStr(dateStr);

    // Retrieve today's checklist progress from localStorage
    const saved = localStorage.getItem("adulting101_checklist");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // parsed format: { "2026-06-09": ["sleep", "water"] }
        if (parsed[dateStr]) {
          setCompletedIds(parsed[dateStr]);
        }
      } catch (e) {
        console.error("Error loading checklist", e);
      }
    }
  }, []);

  const toggleItem = (id: string) => {
    const isCompleted = completedIds.includes(id);
    let nextCompleted: string[];

    if (isCompleted) {
      nextCompleted = completedIds.filter((itemId) => itemId !== id);
    } else {
      nextCompleted = [...completedIds, id];
      // Play checklist completion sound effect
      try {
        const doneSfx = new Audio("/audio/checklist-done.mp3");
        doneSfx.volume = 0.5;
        doneSfx.play().catch(() => {});
      } catch (err) {}
    }

    setCompletedIds(nextCompleted);

    // Save to localStorage
    const saved = localStorage.getItem("adulting101_checklist");
    let parsed: Record<string, string[]> = {};
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    parsed[todayDateStr] = nextCompleted;
    localStorage.setItem("adulting101_checklist", JSON.stringify(parsed));
  };

  const handleResetChecklist = () => {
    if (confirm("Reset checklist hari ini?")) {
      setCompletedIds([]);
      const saved = localStorage.getItem("adulting101_checklist");
      let parsed: Record<string, string[]> = {};
      if (saved) {
        try {
          parsed = JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
      parsed[todayDateStr] = [];
      localStorage.setItem("adulting101_checklist", JSON.stringify(parsed));
    }
  };

  const progressPercent = Math.round((completedIds.length / CHECKLIST_ITEMS.length) * 100);
  const allDone = completedIds.length === CHECKLIST_ITEMS.length;

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-stone-50 overflow-y-auto no-scrollbar animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMenu}
            className="p-2 bg-white hover:bg-stone-100 rounded-full shadow-xs border border-stone-200/50 text-stone-600 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-stone-800">Self-Healing Checklist</h2>
            <p className="text-xs text-stone-500">Mulai kebiasaan kecil sehatmu</p>
          </div>
        </div>
        
        {completedIds.length > 0 && (
          <button
            onClick={handleResetChecklist}
            className="p-2 bg-white hover:bg-stone-100 rounded-full border border-stone-200 text-stone-500 active:scale-95 transition-all"
            title="Reset Checklist"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Info Panel */}
      <div className="bg-brand-mint-50 border border-brand-mint-200 rounded-2xl p-4 flex gap-3 shadow-2xs mb-5 text-left items-start">
        <Info className="w-5 h-5 text-brand-mint-800 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-brand-mint-800">Dahsyatnya Langkah Kecil</h4>
          <p className="text-[10px] text-stone-600 leading-relaxed mt-0.5">
            Menyelesaikan tugas-tugas kecil harian merangsang otak melepaskan dopamin (hormon penghargaan), yang secara efektif menurunkan hormon kortisol penyebab stres berat.
          </p>
        </div>
      </div>

      {/* MULTIMEDIA: VISUAL CHECKLIST AKTIVITAS SEHAT */}
      <div className="w-full rounded-2xl overflow-hidden h-28 relative border border-stone-200/50 bg-stone-100 mb-5 shadow-2xs">
        <img 
          src="/images/checklist-bg.png" 
          alt="Visual Checklist Kebiasaan Sehat" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80";
          }}
        />
      </div>

      {/* Progress Card */}
      <div className="bg-white border border-stone-200/50 rounded-2xl p-4 shadow-2xs mb-5 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-extrabold text-stone-700">
          <span>Progres Self-Care Hari Ini</span>
          <span className="text-brand-mint-800 bg-brand-mint-100 px-2 py-0.5 rounded-sm">
            {completedIds.length} / {CHECKLIST_ITEMS.length} Selesai
          </span>
        </div>
        
        {/* Progress Bar container */}
        <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200/20">
          <div
            className="h-full bg-brand-mint-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        <span className="text-[10px] font-bold text-stone-400 text-right">
          {progressPercent}% Terpenuhi
        </span>
      </div>

      {/* Checklist List */}
      <div className="flex-1 flex flex-col gap-3 my-2">
        {CHECKLIST_ITEMS.map((item) => {
          const isDone = completedIds.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`w-full text-left p-4 rounded-xl border flex gap-3 items-start transition-all transform active:scale-[0.99] cursor-pointer ${
                isDone
                  ? "bg-brand-mint-50/50 border-brand-mint-200 shadow-2xs"
                  : "bg-white border-stone-200/80 hover:bg-stone-50/50 hover:border-brand-mint-300"
              }`}
            >
              <span className="shrink-0 mt-1">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-brand-mint-600" />
                ) : (
                  <Square className="w-5 h-5 text-stone-300" />
                )}
              </span>
              
              {/* MULTIMEDIA: CHECKLIST ITEM ICON */}
              <img src={item.image} alt={item.title} className="w-8 h-8 object-contain shrink-0 select-none" />

              <div>
                <h4 className={`text-xs font-bold ${isDone ? "text-stone-500 line-through" : "text-stone-800"}`}>
                  {item.title}
                </h4>
                <p className="text-[10px] text-stone-500 leading-relaxed mt-0.5">{item.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Celebratory Banner if 100% completed */}
      {allDone && (
        <div className="mt-4 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-2xl p-4 text-white text-center shadow-md animate-bounce flex items-center justify-center gap-3">
          <Award className="w-8 h-8 text-white shrink-0" />
          <div className="text-left">
            <h4 className="text-xs font-black">Luar Biasa! 100% Goal Tercapai</h4>
            <p className="text-[10px] font-medium text-amber-50">
              Kamu telah merawat diri secara hebat hari ini. Tepuk pundakmu dan katakan &ldquo;Good Job!&rdquo; 👏✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
