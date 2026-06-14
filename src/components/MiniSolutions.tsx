"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Wind, Move, Clock, Smartphone, Play, Pause, RotateCcw, Volume2, VolumeX, Activity } from "lucide-react";

interface MiniSolutionsProps {
  onBackToMenu: () => void;
}

type SolutionTab = "breathing" | "stretching" | "timer" | "detox";

export default function MiniSolutions({ onBackToMenu }: MiniSolutionsProps) {
  const [activeTab, setActiveTab] = useState<SolutionTab>("breathing");

  // HTML5 audio refs for nature sounds and focus chime
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const breathAudioRef = useRef<HTMLAudioElement | null>(null);
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);

  // Breathing Exercise State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"Tarik Napas" | "Tahan" | "Hembuskan">("Tarik Napas");
  const [breathSeconds, setBreathSeconds] = useState(4);
  const breathTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Focus Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState<25 | 5 | 15>(25);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calming Audio State
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Breathing Loop effect
  useEffect(() => {
    if (isBreathing) {
      setBreathSeconds(4);
      setBreathPhase("Tarik Napas");

      // Play wind audio
      if (breathAudioRef.current) {
        try {
          breathAudioRef.current.play().catch((e) => console.log("Breath audio blocked", e));
        } catch (err) {
          console.warn("Breath audio play failed", err);
        }
      }

      let sec = 4;
      let phase: "Tarik Napas" | "Tahan" | "Hembuskan" = "Tarik Napas";

      breathTimerRef.current = setInterval(() => {
        sec -= 1;
        if (sec <= 0) {
          if (phase === "Tarik Napas") {
            phase = "Tahan";
            sec = 4;
          } else if (phase === "Tahan") {
            phase = "Hembuskan";
            sec = 4;
          } else {
            phase = "Tarik Napas";
            sec = 4;
          }
          setBreathPhase(phase);
        }
        setBreathSeconds(sec);
      }, 1000);
    } else {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
      // Pause wind audio
      if (breathAudioRef.current) {
        try {
          breathAudioRef.current.pause();
          breathAudioRef.current.currentTime = 0;
        } catch (err) {
          console.warn("Breath audio pause failed", err);
        }
      }
      setBreathPhase("Tarik Napas");
      setBreathSeconds(4);
    }

    return () => {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    };
  }, [isBreathing]);

  // Focus Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      // Play ticking audio
      if (tickAudioRef.current) {
        try {
          tickAudioRef.current.play().catch((e) => console.log("Tick audio blocked", e));
        } catch (err) {
          console.warn("Tick audio play failed", err);
        }
      }

      countdownIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            // Stop ticking audio
            if (tickAudioRef.current) {
              try {
                tickAudioRef.current.pause();
              } catch (err) {
                console.warn("Tick audio pause failed", err);
              }
            }
            // Simulate completion beep/alert
            alert("Sesi timer selesai! Bagus banget, luangkan waktu untuk istirahat sejenak.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      // Stop ticking audio
      if (tickAudioRef.current) {
        try {
          tickAudioRef.current.pause();
        } catch (err) {
          console.warn("Tick audio pause failed", err);
        }
      }
    }

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [isTimerRunning]);

  const selectTimerPreset = (minutes: 25 | 5 | 15) => {
    setIsTimerRunning(false);
    setTimerPreset(minutes);
    setTimeLeft(minutes * 60);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(timerPreset * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-stone-50 overflow-y-auto no-scrollbar animate-fade-in pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBackToMenu}
          className="p-2 bg-white hover:bg-stone-100 rounded-full shadow-xs border border-stone-200/50 text-stone-600 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-stone-800">Mini Solutions</h2>
          <p className="text-xs text-stone-500">Pereda stres kilat untukmu</p>
        </div>
      </div>

      {/* Grid of Solutions Navigation */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { id: "breathing", label: "Napas", icon: <Wind className="w-4 h-4" />, color: "text-brand-blue-500" },
          { id: "stretching", label: "Peregangan", icon: <Move className="w-4 h-4" />, color: "text-brand-mint-600" },
          { id: "timer", label: "Timer", icon: <Clock className="w-4 h-4" />, color: "text-brand-lavender-500" },
          { id: "detox", label: "Detox", icon: <Smartphone className="w-4 h-4" />, color: "text-brand-cream-600" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveTab(btn.id as SolutionTab)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${activeTab === btn.id
                ? "bg-stone-900 border-stone-800 text-white shadow-xs"
                : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50/50"
              }`}
          >
            <span className={activeTab === btn.id ? "text-white" : btn.color}>{btn.icon}</span>
            <span className="text-[9px] font-extrabold">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="py-2">

        {/* PANEL 1: BREATHING */}
        {activeTab === "breathing" && (
          <div className="flex flex-col items-center text-center py-2 animate-fade-in gap-4">
            <div>
              <h3 className="text-base font-extrabold text-stone-800">Latihan Napas Kotak (4-4-4)</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Bantu menurunkan detak jantung dan menenangkan saraf otak yang terlalu aktif.
              </p>
            </div>

            {/* Breathing Ring visualizer */}
            <div className="relative w-44 h-44 my-4 flex items-center justify-center">
              {/* Animated pulse ring */}
              <div
                className={`absolute inset-0 rounded-full border-4 border-dashed border-brand-blue-200 transition-all duration-[4000ms] ease-in-out ${isBreathing && breathPhase === "Tarik Napas" ? "scale-140 opacity-100 bg-brand-blue-50/30" : ""
                  } ${isBreathing && breathPhase === "Tahan" ? "scale-140 opacity-100 bg-brand-blue-100/40" : ""
                  } ${isBreathing && breathPhase === "Hembuskan" ? "scale-100 opacity-60 bg-transparent" : ""
                  } ${!isBreathing ? "scale-100 opacity-30" : ""}`}
              />

              {/* Inner Circle */}
              <div className="w-32 h-32 rounded-full bg-white border border-stone-200 shadow-lg flex flex-col items-center justify-center z-10 p-4">
                <span className="text-xs font-semibold text-stone-400">Fase</span>
                <span className="text-sm font-extrabold text-brand-blue-800 my-1 min-h-[20px] transition-all">
                  {isBreathing ? breathPhase : "Siap?"}
                </span>
                <span className="text-2xl font-black text-brand-blue-500 animate-pulse">
                  {isBreathing ? `${breathSeconds}s` : "🧘"}
                </span>
              </div>
            </div>

            <div className="w-full">
              <button
                onClick={() => setIsBreathing(!isBreathing)}
                className={`w-full py-3.5 rounded-xl font-bold transition-all ${isBreathing
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-brand-blue-500 hover:bg-brand-blue-600 text-white shadow-sm"
                  }`}
              >
                {isBreathing ? "Hentikan Latihan" : "Mulai Napas Tenang"}
              </button>
              <p className="text-[10px] text-stone-400 mt-2 italic">
                * Ikuti panduan garis luar: Tarik (4s) &rarr; Tahan (4s) &rarr; Hembus (4s)
              </p>


            </div>
          </div>
        )}

        {/* PANEL 2: STRETCHING */}
        {activeTab === "stretching" && (
          <div className="flex flex-col animate-fade-in gap-4">
            <div className="text-center">
              <h3 className="text-base font-extrabold text-stone-800">Study Break Stretching</h3>
              <p className="text-xs text-stone-500 mt-1">
                Lakukan peregangan 2 menit untuk melepaskan kram otot leher dan pundak.
              </p>
            </div>

            {/* MULTIMEDIA: ILUSTRASI GERAKAN RELAKSASI */}
            <div className="w-full rounded-xl overflow-hidden h-28 relative border border-stone-200/50 bg-stone-100 shadow-2xs">
              <img
                src="/images/stretching-steps.png"
                alt="Ilustrasi Gerakan Peregangan"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80";
                }}
              />
            </div>

            <div className="space-y-2">
              {[
                { step: "1", title: "Neck Rolls (Putar Leher)", desc: "Tundukkan kepala, putar leher searah jarum jam perlahan selama 5 kali, lalu ganti arah." },
                { step: "2", title: "Shoulder Shrugs (Pundak)", desc: "Tarik pundakmu ke atas mendekati telinga, tahan 3 detik, lalu jatuhkan. Ulangi 8 kali." },
                { step: "3", title: "Wrist Stretch (Pergelangan)", desc: "Luruskan satu lengan ke depan, tarik telapak tangan ke belakang dengan tangan satunya. Tahan 10s." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-stone-200/50 rounded-xl p-2.5 flex gap-3 shadow-2xs items-start">
                  <span className="w-6 h-6 rounded-full bg-brand-mint-100 text-brand-mint-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-stone-800">{item.title}</h4>
                    <p className="text-[10px] text-stone-500 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>


          </div>
        )}

        {/* PANEL 3: FOCUS TIMER */}
        {activeTab === "timer" && (
          <div className="flex flex-col items-center text-center py-2 animate-fade-in gap-4">
            <div>
              <h3 className="text-base font-extrabold text-stone-800">Pomodoro Focus Timer</h3>
              <p className="text-xs text-stone-500 mt-1">
                Belajar fokus 25 menit, lalu istirahat 5 menit. Efektif kurangi kejenuhan.
              </p>
            </div>

            {/* Presets Select */}
            <div className="flex gap-2 my-2 justify-center">
              {[
                { min: 25, label: "Fokus" },
                { min: 5, label: "Jeda Singkat" },
                { min: 15, label: "Jeda Lama" }
              ].map((preset) => (
                <button
                  key={preset.min}
                  onClick={() => selectTimerPreset(preset.min as 25 | 5 | 15)}
                  className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full border transition-all ${timerPreset === preset.min
                      ? "bg-brand-lavender-500 text-white border-brand-lavender-600 shadow-2xs"
                      : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                    }`}
                >
                  {preset.min}m ({preset.label})
                </button>
              ))}
            </div>

            {/* Countdown digits display */}
            <div className="my-3">
              <div className="w-40 h-40 rounded-full border-4 border-brand-lavender-100 flex flex-col items-center justify-center bg-white shadow-md">
                <span className="text-3xl font-black text-stone-800 tracking-wider">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-[10px] font-bold text-brand-lavender-500 uppercase tracking-widest mt-1">
                  {isTimerRunning ? "Running" : "Paused"}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 w-full">
              <button
                onClick={toggleTimer}
                className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-xs transition-colors active:scale-95"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                {isTimerRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={resetTimer}
                className="p-3 bg-white hover:bg-stone-100 text-stone-600 font-bold rounded-xl border border-stone-200/60 shadow-2xs transition-colors active:scale-95"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>


          </div>
        )}

        {/* PANEL 4: DIGITAL DETOX */}
        {activeTab === "detox" && (
          <div className="flex flex-col animate-fade-in gap-4">
            <div>
              <h3 className="text-base font-extrabold text-stone-800">1-Hour Off-Screen Challenge</h3>
              <p className="text-xs text-stone-500 mt-1">
                Lepas dari gadget sejenak untuk memulihkan energi mentalmu secara natural.
              </p>
            </div>

            <div className="bg-white border border-stone-200/50 rounded-2xl p-4 shadow-2xs my-4 space-y-3 text-left">
              <p className="text-xs font-bold text-brand-cream-800 mb-2">💡 Aktivitas bebas layar yang seru:</p>
              {[
                "Dengerin lagu favorit sambil coret-coret di kertas kosong.",
                "Buat segelas teh hangat atau susu cokelat dan nikmati tanpa HP.",
                "Rapikan meja belajarmu, dekorasi ulang biar segar.",
                "Keluar rumah, rasakan hembusan angin atau siram tanaman."
              ].map((act, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-brand-cream-500 mt-0.5">✨</span>
                  <p className="text-[11px] text-stone-600 leading-relaxed">{act}</p>
                </div>
              ))}
            </div>

            <div className="bg-brand-cream-50 border border-brand-cream-200 rounded-xl p-3 text-xs text-stone-600 font-medium leading-relaxed">
              * Detox tip: Balikkan layar HP-mu ke bawah, nyalakan mode senyap, dan rasakan ketenangan tanpa notifikasi medsos selama 60 menit.
            </div>


          </div>
        )}
      </div>

      {/* 2x2 Video Grid of Relaxation Solutions */}
      <div className="bg-white border border-stone-200/50 rounded-2xl p-4 shadow-2xs mt-6 text-left">
        <h3 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-3">
          Galeri Video Relaksasi (Grid 2x2)
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-extrabold text-stone-600">1. Latihan Napas</span>
            <video src="/videos/breathing.mp4" controls className="w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-extrabold text-stone-600">2. Peregangan</span>
            <video src="/videos/stretching.mp4" controls className="w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-extrabold text-stone-600">3. Focus Timer</span>
            <video src="/videos/focus-timer.mp4" controls className="w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-extrabold text-stone-600">4. Digital Detox</span>
            <video src="/videos/digital-detox.mp4" controls className="w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Relaxing Audio Player Placeholder */}
      <div className="bg-white border border-stone-200/50 rounded-2xl p-4 shadow-2xs mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-brand-blue-50 text-brand-blue-600 rounded-xl">
              <Activity className={`w-4 h-4 ${audioPlaying ? "animate-pulse" : ""}`} />
            </span>
            <div className="text-left">
              <h4 className="text-xs font-bold text-stone-800">Suara Relaksasi Alam</h4>
              <p className="text-[10px] text-stone-500">Track: Hujan Rintik & Hutan Damai</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (audioRef.current) {
                try {
                  if (audioPlaying) {
                    audioRef.current.pause();
                  } else {
                    audioRef.current.play().catch((err) => console.log("Play blocked", err));
                  }
                } catch (err) {
                  console.warn("Relax audio play/pause failed", err);
                }
              }
              setAudioPlaying(!audioPlaying);
            }}
            className="p-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-700 transition-colors cursor-pointer"
          >
            {audioPlaying ? <Volume2 className="w-4 h-4 text-brand-blue-600 animate-pulse" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>
        </div>

        {/* Visualizer Simulation */}
        {audioPlaying && (
          <div className="flex gap-0.5 items-end h-6 mt-3 justify-center">
            {[3, 7, 4, 9, 5, 8, 3, 6, 2, 7, 5, 8, 4, 9, 3, 6].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-brand-blue-400 rounded-full animate-pulse transition-all duration-300"
                style={{
                  height: `${h * 10}%`,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        )}

        {/* MULTIMEDIA: AUDIO RELAKSAS (angin-halus.mp3, ticking-lembut.mp3, ambient-hening.mp3 di public/audio/) */}
        <audio
          src="/audio/ambient-hening.mp3"
          ref={audioRef}
          loop
          onPlay={() => setAudioPlaying(true)}
          onPause={() => setAudioPlaying(false)}
        />
        <audio
          src="/audio/angin-halus.mp3"
          ref={breathAudioRef}
          loop
          onPlay={() => setIsBreathing(true)}
          onPause={() => setIsBreathing(false)}
        />
        <audio
          src="/audio/ticking-lembut.mp3"
          ref={tickAudioRef}
          loop
          onPlay={() => setIsTimerRunning(true)}
          onPause={() => setIsTimerRunning(false)}
        />
      </div>
    </div>
  );
}
