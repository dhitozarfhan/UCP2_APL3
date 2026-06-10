"use client";

import React, { useState } from "react";
import { AlertCircle, ArrowLeft, RefreshCw, CheckCircle, Flame, Shield, HelpCircle } from "lucide-react";

interface BurnoutCheckProps {
  onBackToMenu: () => void;
}

interface Question {
  id: number;
  text: string;
  options: { text: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Seberapa sering kamu merasa capek banget pas bangun pagi, padahal jam tidurmu sudah cukup?",
    options: [
      { text: "Jarang banget / Nggak pernah", score: 0 },
      { text: "Kadang-kadang, kalau tugas sekolah numpuk", score: 1 },
      { text: "Sering banget, hampir tiap hari rasanya loyo", score: 2 },
      { text: "Capek luar biasa sampai malas ngapa-ngapain", score: 3 },
    ],
  },
  {
    id: 2,
    text: "Saat guru menerangkan pelajaran atau sedang belajar mandiri, konsentrasimu...",
    options: [
      { text: "Aman banget, gampang menyerap materi", score: 0 },
      { text: "Agak gampang ke-distrak tapi masih bisa fokus", score: 1 },
      { text: "Susah konsentrasi, pikiran gampang melayang", score: 2 },
      { text: "Lemot total, nggak ada materi yang masuk ke otak", score: 3 },
    ],
  },
  {
    id: 3,
    text: "Melihat tugas sekolah atau kegiatan ekstrakurikuler yang biasanya kamu suka, rasanya...",
    options: [
      { text: "Masih semangat dong dan happy mengerjakannya", score: 0 },
      { text: "Kadang malas memulai, tapi kalau dijalani seru", score: 1 },
      { text: "Nggak ada gairah sama sekali, serasa beban berat", score: 2 },
      { text: "Pengen menghindar total, bodo amat dengan tugas", score: 3 },
    ],
  },
  {
    id: 4,
    text: "Pernahkah kamu merasa cemas berlebihan tentang nilai, ujian, atau masa depan?",
    options: [
      { text: "Santai aja, aku berusaha lakukan yang terbaik", score: 0 },
      { text: "Cemas sewajarnya kalau mau ujian saja", score: 1 },
      { text: "Lumayan sering kepikiran sampai dada sesak atau pusing", score: 2 },
      { text: "Panik berlebihan setiap hari, takut gagal total", score: 3 },
    ],
  },
  {
    id: 5,
    text: "Gimana reaksi emosimu akhir-akhir ini kalau ada masalah sepele di rumah atau sekolah?",
    options: [
      { text: "Tenang, masih bisa berpikir jernih", score: 0 },
      { text: "Agak sebal sebentar, terus cepat reda", score: 1 },
      { text: "Gampang kesal, sensi banget kayak petasan", score: 2 },
      { text: "Sensitif parah, pengen nangis atau teriak tanpa sebab", score: 3 },
    ],
  },
  {
    id: 6,
    text: "Apakah kamu merasa kewalahan dengan ekspektasi dari orang tua, guru, atau teman?",
    options: [
      { text: "Nggak kok, mereka mendukungku apa adanya", score: 0 },
      { text: "Ada sedikit tekanan, tapi masih bisa kuhadapi", score: 1 },
      { text: "Tertekan banget, rasanya kayak memikul beban berat", score: 2 },
      { text: "Kewalahan parah, serasa mau menyerah saja", score: 3 },
    ],
  },
];

export default function BurnoutCheck({ onBackToMenu }: BurnoutCheckProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (optionIdx: number, score: number) => {
    setSelectedOption(optionIdx);
    
    // Play option select sound effect
    try {
      const clickSfx = new Audio("/audio/pop-click.mp3");
      clickSfx.volume = 0.45;
      clickSfx.play().catch(() => {});
    } catch (err) {}
    
    // Smooth delay for animation visual feedback
    setTimeout(() => {
      const nextAnswers = [...answers, score];
      setAnswers(nextAnswers);
      setSelectedOption(null);
      
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setIsFinished(true);
      }
    }, 450);
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setAnswers([]);
    setSelectedOption(null);
    setIsFinished(false);
  };

  // Calculate results
  const totalScore = answers.reduce((a, b) => a + b, 0);
  const maxScore = QUESTIONS.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let resultType: "low" | "medium" | "high" = "low";
  let resultTitle = "";
  let resultColor = "";
  let resultBg = "";
  let resultText = "";
  let resultIcon = <Shield className="w-8 h-8" />;

  if (totalScore <= 5) {
    resultType = "low";
    resultTitle = "Rendah (Lampu Hijau 🟢)";
    resultColor = "text-brand-mint-800 border-brand-mint-200 bg-brand-mint-50";
    resultBg = "bg-brand-mint-500";
    resultText = "Keren! Tingkat burnout-mu masih sangat rendah. Kamu mampu mengelola stres dengan baik. Tetap pertahankan gaya hidup seimbang ini, ya! Jangan lupa tetap luangkan waktu untuk istirahat agar baterai mentalmu terisi terus.";
    resultIcon = <CheckCircle className="w-8 h-8 text-brand-mint-600" />;
  } else if (totalScore <= 11) {
    resultType = "medium";
    resultTitle = "Sedang (Lampu Kuning 🟡)";
    resultColor = "text-brand-cream-800 border-brand-cream-200 bg-brand-cream-50";
    resultBg = "bg-brand-cream-500";
    resultText = "Hati-hati! Tubuh dan pikiranmu sudah mulai mengirimkan sinyal kelelahan. Kamu sedang berada di fase jenuh. Cobalah luangkan waktu 15-30 menit sehari untuk melakukan hobi yang menenangkan atau digital detox sejenak.";
    resultIcon = <AlertCircle className="w-8 h-8 text-brand-cream-600" />;
  } else {
    resultType = "high";
    resultTitle = "Tinggi (Lampu Merah 🔴)";
    resultColor = "text-brand-lavender-800 border-brand-lavender-200 bg-brand-lavender-50";
    resultBg = "bg-red-500";
    resultText = "Lampu merah! Kamu mengalami burnout yang cukup tinggi. Pikiran dan fisikmu sudah sangat kewalahan. Sangat disarankan untuk segera mengambil jeda istirahat penuh dari tugas, curhat ke orang tua atau guru BK, dan gunakan solusi relaksasi di aplikasi ini.";
    resultIcon = <Flame className="w-8 h-8 text-red-500 animate-pulse" />;
  }

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-stone-50 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBackToMenu}
          className="p-2 bg-white hover:bg-stone-100 rounded-full shadow-xs border border-stone-200/50 text-stone-600 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-stone-800">Burnout Check</h2>
          <p className="text-xs text-stone-500">Ketahui kondisi mentalmu</p>
        </div>
      </div>

      {!isFinished ? (
        // QUIZ SCREEN
        <div className="flex-1 flex flex-col justify-center my-6 gap-6">
          {/* Progress Indicator */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-stone-500 mb-1">
              <span>Pertanyaan {currentIdx + 1} dari {QUESTIONS.length}</span>
              <span>{Math.round(((currentIdx) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-blue-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question text */}
          <div className="bg-white border border-stone-200/50 rounded-2xl p-5 shadow-xs">
            <span className="inline-flex p-2 bg-brand-blue-50 rounded-xl text-brand-blue-600 mb-3">
              <HelpCircle className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-stone-800 leading-relaxed">
              {QUESTIONS[currentIdx].text}
            </h3>
          </div>

          {/* Options list */}
          <div className="flex flex-col gap-3">
            {QUESTIONS[currentIdx].options.map((opt, oIdx) => {
              const isSelected = selectedOption === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleOptionSelect(oIdx, opt.score)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all transform duration-150 active:scale-[0.99] ${
                    isSelected
                      ? "bg-brand-blue-500 text-white border-brand-blue-600 scale-[0.98] shadow-inner"
                      : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50/50 hover:border-brand-blue-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.text}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        // RESULT SCREEN
        <div className="flex-1 flex flex-col justify-center my-6 gap-6 animate-fade-in">
          <div className={`p-6 rounded-2xl border text-center flex flex-col items-center gap-4 ${resultColor} shadow-xs`}>
            {resultIcon}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Tingkat Burnout Anda</p>
              <h3 className="text-xl font-extrabold mt-1">{resultTitle}</h3>
            </div>

            {/* Score visual indicator */}
            <div className="relative w-full h-3 bg-stone-200 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full ${resultBg} transition-all duration-1000`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-[11px] text-stone-500 font-semibold">
              Skor: {totalScore} / {maxScore} ({percentage}%)
            </div>

            <p className="text-xs leading-relaxed text-stone-700 font-medium bg-white/70 p-4 rounded-xl border border-stone-200/20 shadow-2xs">
              {resultText}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={resetQuiz}
              className="w-full py-3 bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors active:scale-[0.98]"
            >
              <RefreshCw className="w-4 h-4" /> Ulangi Kuesioner
            </button>
            <button
              onClick={onBackToMenu}
              className="w-full py-3 bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold rounded-xl transition-colors active:scale-[0.98]"
            >
              Kembali ke Menu Utama
            </button>
          </div>
        </div>
      )}

      {/* Footer warning */}
      <p className="text-[10px] text-stone-400 text-center italic">
        * Kuesioner ini dirancang untuk edukasi & refleksi diri, bukan diagnosis medis.
      </p>
    </div>
  );
}
