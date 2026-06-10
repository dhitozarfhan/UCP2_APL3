"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Info, Trash2, Calendar, Smile } from "lucide-react";

interface MoodTrackerProps {
  onBackToMenu: () => void;
}

interface MoodEntry {
  dateStr: string; // YYYY-MM-DD
  emoji: string;
  label: string;
  note: string;
}

const MOOD_OPTIONS = [
  { emoji: "🌟", image: "/images/emoji/senang.png", label: "Gembira", color: "bg-amber-100 border-amber-300 text-amber-800" },
  { emoji: "😊", image: "/images/emoji/biasa.png", label: "Tenang", color: "bg-brand-mint-100 border-brand-mint-300 text-brand-mint-800" },
  { emoji: "😐", image: "/images/emoji/biasa.png", label: "Biasa Aja", color: "bg-brand-blue-100 border-brand-blue-300 text-brand-blue-800" },
  { emoji: "😕", image: "/images/emoji/cemas.png", label: "Cemas", color: "bg-brand-lavender-100 border-brand-lavender-300 text-brand-lavender-800" },
  { emoji: "😢", image: "/images/emoji/sedih.png", label: "Lelah", color: "bg-rose-100 border-rose-300 text-rose-800" },
];

export default function MoodTracker({ onBackToMenu }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState<Record<string, MoodEntry>>({});
  const [currentDateStr, setCurrentDateStr] = useState("");

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIdx = now.getMonth(); // 0-indexed
  const currentMonthName = now.toLocaleString("id-ID", { month: "long" });

  useEffect(() => {
    // Generate current date string YYYY-MM-DD
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;
    setCurrentDateStr(todayStr);

    // Load mood history from localStorage
    const saved = localStorage.getItem("adulting101_moods");
    if (saved) {
      try {
        setMoodHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading mood history", e);
      }
    }
  }, []);

  const handleSaveMood = () => {
    if (!selectedMood) {
      alert("Pilih emoji mood-mu dulu hari ini!");
      return;
    }

    const moodOpt = MOOD_OPTIONS.find((m) => m.emoji === selectedMood);
    const newEntry: MoodEntry = {
      dateStr: currentDateStr,
      emoji: selectedMood,
      label: moodOpt?.label || "",
      note: note.trim(),
    };

    const updatedHistory = {
      ...moodHistory,
      [currentDateStr]: newEntry,
    };

    setMoodHistory(updatedHistory);
    localStorage.setItem("adulting101_moods", JSON.stringify(updatedHistory));
    
    // Clear Form inputs except mood state (keeps active visual feedback)
    setNote("");
    alert("Mood hari ini berhasil dicatat! Lihat rekamannya di kalender emosi di bawah.");
  };

  const handleClearHistory = () => {
    if (confirm("Apakah kamu yakin ingin menghapus seluruh riwayat catatan mood?")) {
      localStorage.removeItem("adulting101_moods");
      setMoodHistory({});
      setSelectedMood(null);
      setNote("");
    }
  };

  // Build Calendar grid
  const daysInMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="flex-1 flex flex-col p-6 bg-stone-50 overflow-y-auto no-scrollbar animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMenu}
            className="p-2 bg-white hover:bg-stone-100 rounded-full shadow-xs border border-stone-200/50 text-stone-600 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-stone-800">Mood Tracker</h2>
            <p className="text-xs text-stone-500">Ekspresikan perasaanmu</p>
          </div>
        </div>
        
        {Object.keys(moodHistory).length > 0 && (
          <button
            onClick={handleClearHistory}
            className="p-2 text-stone-400 hover:text-red-500 transition-colors"
            title="Hapus Semua Riwayat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-brand-blue-50 border border-brand-blue-200 rounded-2xl p-4 flex gap-3 shadow-2xs mb-6 text-left items-start">
        <Info className="w-5 h-5 text-brand-blue-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-brand-blue-800">Kenapa Penting Mencatat Mood?</h4>
          <p className="text-[10px] text-stone-600 leading-relaxed mt-0.5">
            Mengenali emosi membantumu memetakan pemicu stres, sadar kapan harus beristirahat, serta melatih kejujuran emosional pada diri sendiri.
          </p>
        </div>
      </div>

      {/* MULTIMEDIA: ILUSTRASI KONDISI EMOSI */}
      <div className="w-full rounded-2xl overflow-hidden h-28 relative border border-stone-200/50 bg-stone-100 mb-6 shadow-2xs">
        <img 
          src="/images/mood-calendar.png" 
          alt="Ilustrasi Kondisi Emosional" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&q=80";
          }}
        />
      </div>

      {/* Form Log Mood */}
      <div className="bg-white border border-stone-200/50 rounded-2xl p-5 shadow-2xs mb-6 space-y-4">
        <div>
          <h3 className="text-xs font-extrabold text-stone-700 mb-2">Bagaimana perasaanmu hari ini?</h3>
          <div className="flex justify-between items-center gap-1.5">
            {MOOD_OPTIONS.map((opt) => {
              const isSelected = selectedMood === opt.emoji;
              return (
                <button
                  key={opt.emoji}
                  onClick={() => setSelectedMood(opt.emoji)}
                  className={`flex-1 flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all transform active:scale-95 cursor-pointer ${
                    isSelected
                      ? `${opt.color} scale-105 shadow-xs border-2`
                      : "bg-stone-50 border-stone-200 text-stone-400 hover:bg-stone-100"
                  }`}
                >
                  <img src={opt.image} alt={opt.label} className="w-8 h-8 object-contain mb-1 select-none" />
                  <span className="text-[9px] font-bold">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-extrabold text-stone-700 mb-1.5">Ada cerita seru apa hari ini? (Catatan singkat)</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Tulis kegiatan atau hal yang bikin mood kamu seperti ini..."
            maxLength={100}
            className="w-full h-16 p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs placeholder:text-stone-400 focus:outline-hidden focus:border-brand-blue-400 transition-colors resize-none"
          />
          <div className="text-[9px] text-stone-400 text-right mt-0.5">Maks. 100 karakter</div>
        </div>

        <button
          onClick={handleSaveMood}
          className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs shadow-xs transition-colors active:scale-95"
        >
          <Save className="w-4 h-4" /> Simpan Jurnal Mood
        </button>
      </div>

      {/* Grid Calendar display */}
      <div className="bg-white border border-stone-200/50 rounded-2xl p-5 shadow-2xs">
        <h3 className="text-xs font-extrabold text-stone-700 flex items-center gap-1.5 mb-3">
          <Calendar className="w-4 h-4 text-brand-lavender-500" />
          Kalender Emosional: {currentMonthName} {currentYear}
        </h3>

        {/* Calendar Grid representation */}
        <div className="grid grid-cols-7 gap-2">
          {/* Calendar Day headers */}
          {["S", "S", "R", "K", "J", "S", "M"].map((dayName, idx) => (
            <div key={idx} className="text-center text-[9px] font-bold text-stone-400 uppercase py-1">
              {dayName}
            </div>
          ))}

          {/* Monthly grid cells */}
          {calendarDays.map((dayNum) => {
            const dayStr = String(dayNum).padStart(2, "0");
            const mm = String(currentMonthIdx + 1).padStart(2, "0");
            const entryKey = `${currentYear}-${mm}-${dayStr}`;
            const entry = moodHistory[entryKey];
            const opt = entry ? MOOD_OPTIONS.find((o) => o.emoji === entry.emoji) : null;

            return (
              <div
                key={dayNum}
                className={`aspect-square rounded-lg border border-stone-100 flex flex-col items-center justify-center relative cursor-pointer group hover:bg-stone-50 transition-colors ${
                  entryKey === currentDateStr ? "ring-2 ring-brand-blue-400" : ""
                } ${entry ? "bg-stone-50" : "bg-white"}`}
                title={entry ? `${entry.dateStr}: ${entry.label}. Note: ${entry.note || "-"}` : `Hari ke-${dayNum}`}
              >
                {/* Small date digit */}
                <span className="absolute top-0.5 left-1 text-[8px] text-stone-400 group-hover:text-stone-600 font-bold">
                  {dayNum}
                </span>

                {/* Mood emoji if exists */}
                {entry ? (
                  <img src={opt?.image || "/images/emoji/biasa.png"} alt={entry.label} className="w-6 h-6 object-contain mt-1 animate-bounce select-none" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-200 mt-2" />
                )}
              </div>
            );
          })}
        </div>
        
        <p className="text-[9px] text-stone-400 italic text-center mt-4">
          * Kotak bergaris biru menunjukkan hari ini. Layangkan kursor di atas emoji untuk membaca catatan harianmu.
        </p>
      </div>
    </div>
  );
}
