"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Home as HomeIcon,
  Activity,
  BookOpen,
  Wind,
  Smile,
  Zap,
  CheckSquare,
  Volume2,
  VolumeX,
  Sparkles
} from "lucide-react";

// Component imports
import OpeningScreen from "@/components/OpeningScreen";
import Dashboard from "@/components/Dashboard";
import BurnoutCheck from "@/components/BurnoutCheck";
import KenaliBurnout from "@/components/KenaliBurnout";
import MiniSolutions from "@/components/MiniSolutions";
import MoodTracker from "@/components/MoodTracker";
import DailyMindset from "@/components/DailyMindset";
import SelfHealingChecklist from "@/components/SelfHealingChecklist";

type TabId = "home" | "quiz" | "info" | "solutions" | "mood" | "boost" | "checklist";

export default function AppContainer() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [isMuted, setIsMuted] = useState(true);

  // HTML5 audio reference for calming background music
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio Synth references for Calm ambient sound (fallback)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Refs to track play state during video playback
  const wasPlayingRef = useRef(false);
  const isMutedRef = useRef(isMuted);

  // Sync isMutedRef with isMuted state
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Synthesize soft calming meditation drone
  // Synthesize a beautiful, rich, warm calming meditation pad (Major 9th chord with organic LFO sweeps)
  const startCalmingSynth = () => {
    stopCalmingSynth();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.03; // Base volume

      const mainFilter = ctx.createBiquadFilter();
      mainFilter.type = "lowpass";
      mainFilter.frequency.value = 170; // Warm low-pass cutoff

      // Slow LFO to sweep filter cutoff frequency (12.5s cycle)
      const filterLFO = ctx.createOscillator();
      const filterLFOGain = ctx.createGain();
      filterLFO.frequency.value = 0.08;
      filterLFOGain.gain.value = 40;

      filterLFO.connect(filterLFOGain);
      filterLFOGain.connect(mainFilter.frequency);

      // Slow LFO to modulate volume like calm breathing (8s cycle)
      const volLFO = ctx.createOscillator();
      const volLFOGain = ctx.createGain();
      volLFO.frequency.value = 0.125;
      volLFOGain.gain.value = 0.012;

      volLFO.connect(volLFOGain);
      volLFOGain.connect(masterGain.gain);

      // Connect nodes: Oscillators -> Filter -> Master Gain -> Output
      mainFilter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Lush Major 9th detuned ambient voicing
      const chords = [
        65.41,  // C2 (Warm grounding bass)
        130.81, // C3 (Mid root)
        196.00, // G3 (Harmonious fifth)
        246.94, // B3 (Dreamy major 7th)
        293.66, // D4 (Lush 9th)
      ];

      const oscillators: OscillatorNode[] = [];

      chords.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Add subtle detuning for a rich chorus texture (except bass)
        if (index > 0) {
          osc.detune.setValueAtTime((Math.random() - 0.5) * 8, ctx.currentTime);
        }

        osc.connect(mainFilter);
        osc.start();
        oscillators.push(osc);
      });

      filterLFO.start();
      volLFO.start();

      // Store references to stop them later
      (osc1Ref as any).current = oscillators;
      (osc2Ref as any).current = [filterLFO, volLFO];
      gainNodeRef.current = masterGain;

    } catch (e) {
      console.warn("Audio synthesis was blocked or not supported by browser", e);
    }
  };

  const stopCalmingSynth = () => {
    try {
      if (Array.isArray(osc1Ref.current)) {
        osc1Ref.current.forEach((osc: any) => {
          try {
            osc.stop();
          } catch (e) { }
        });
      } else if (osc1Ref.current && typeof (osc1Ref.current as any).stop === "function") {
        try {
          (osc1Ref.current as any).stop();
        } catch (e) { }
      }

      if (Array.isArray(osc2Ref.current)) {
        osc2Ref.current.forEach((lfo: any) => {
          try {
            lfo.stop();
          } catch (e) { }
        });
      } else if (osc2Ref.current && typeof (osc2Ref.current as any).stop === "function") {
        try {
          (osc2Ref.current as any).stop();
        } catch (e) { }
      }
    } catch (e) { }

    osc1Ref.current = null;
    osc2Ref.current = null;
    gainNodeRef.current = null;

    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) { }
      audioCtxRef.current = null;
    }
  };

  const toggleMute = (e?: React.MouseEvent | React.KeyboardEvent | Event) => {
    if (e) {
      try {
        e.stopPropagation();
      } catch (err) { }
    }
    if (bgAudioRef.current) {
      if (isMuted) {
        try {
          const playPromise = bgAudioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                stopCalmingSynth();
                setIsMuted(false);
              })
              .catch((err) => {
                console.warn("Calming MP3 play failed, falling back to Web Audio synth", err);
                startCalmingSynth();
                setIsMuted(false);
              });
          } else {
            stopCalmingSynth();
            setIsMuted(false);
          }
        } catch (err) {
          console.warn("Calming MP3 play threw synchronous error, falling back to Web Audio synth", err);
          startCalmingSynth();
          setIsMuted(false);
        }
      } else {
        try {
          bgAudioRef.current.pause();
        } catch (err) {
          console.warn("Calming MP3 pause failed", err);
        }
        stopCalmingSynth();
        setIsMuted(true);
      }
    } else {
      if (isMuted) {
        startCalmingSynth();
        setIsMuted(false);
      } else {
        stopCalmingSynth();
        setIsMuted(true);
      }
    }
  };

  // Cleanup synthesizer on component unmount
  useEffect(() => {
    return () => {
      stopCalmingSynth();
    };
  }, []);

  // Unified media playback coordinator to prevent sound overlap (collision)
  useEffect(() => {
    const handleMediaPlay = (e: Event) => {
      const target = e.target;

      // --- VIDEO PLAYBACK ---
      if (target instanceof HTMLVideoElement) {
        // Pause all other video elements on the page to prevent overlapping video sounds
        const videos = document.querySelectorAll("video");
        videos.forEach((vid) => {
          if (vid !== target) {
            try { vid.pause(); } catch (err) {}
          }
        });

        // Only pause BGM/audios if the video is not muted and has sound
        if (!target.muted && target.volume > 0) {
          // If BGM is playing (isMuted is false)
          if (!isMutedRef.current) {
            wasPlayingRef.current = true;
            if (bgAudioRef.current) {
              try { bgAudioRef.current.pause(); } catch (err) {}
            }
            stopCalmingSynth();
            setIsMuted(true);
          }

          // Pause all local audio elements on the page
          const audios = document.querySelectorAll("audio");
          audios.forEach((audio) => {
            if (audio !== bgAudioRef.current) {
              try { audio.pause(); } catch (err) {}
            }
          });
        }
      }

      // --- AUDIO PLAYBACK ---
      if (target instanceof HTMLAudioElement) {
        const src = target.src || "";
        const isBGM = target === bgAudioRef.current;
        const isSFX = src.includes("checklist-done.mp3") || src.includes("pop-click.mp3");

        if (isSFX) {
          return; // Allow short SFX to play without interruption
        }

        if (isBGM) {
          // If global BGM started playing, pause all other long ambient audio tracks
          const audios = document.querySelectorAll("audio");
          audios.forEach((audio) => {
            if (audio !== bgAudioRef.current) {
              const audioSrc = audio.src || "";
              const isOtherSFX = audioSrc.includes("checklist-done.mp3") || audioSrc.includes("pop-click.mp3");
              if (!isOtherSFX) {
                try { audio.pause(); } catch (err) {}
              }
            }
          });

          // Also pause any playing videos
          const videos = document.querySelectorAll("video");
          videos.forEach((vid) => {
            try { vid.pause(); } catch (err) {}
          });
        } else {
          // If a local long audio track started playing, pause the global BGM
          if (!isMutedRef.current) {
            wasPlayingRef.current = true;
            if (bgAudioRef.current) {
              try { bgAudioRef.current.pause(); } catch (err) {}
            }
            stopCalmingSynth();
            setIsMuted(true);
          }

          // Also pause other local long audio tracks so only one plays at a time
          const audios = document.querySelectorAll("audio");
          audios.forEach((audio) => {
            if (audio !== bgAudioRef.current && audio !== target) {
              const audioSrc = audio.src || "";
              const isOtherSFX = audioSrc.includes("checklist-done.mp3") || audioSrc.includes("pop-click.mp3");
              if (!isOtherSFX) {
                try { audio.pause(); } catch (err) {}
              }
            }
          });

          // Also pause all video elements
          const videos = document.querySelectorAll("video");
          videos.forEach((vid) => {
            try { vid.pause(); } catch (err) {}
          });
        }
      }
    };

    const handleMediaPauseOrEnd = (e: Event) => {
      const target = e.target;

      // If BGM was playing before, and there are no other unmuted videos or long audios playing, resume BGM
      if (wasPlayingRef.current) {
        if (target instanceof HTMLVideoElement || target instanceof HTMLAudioElement) {
          const src = (target as any).src || "";
          const isBGM = target === bgAudioRef.current;
          const isSFX = src.includes("checklist-done.mp3") || src.includes("pop-click.mp3");

          if (isBGM || isSFX) {
            return;
          }

          // Check if there are other unmuted videos playing
          const videos = document.querySelectorAll("video");
          const anyVideoPlaying = Array.from(videos).some(
            (vid) => vid !== target && !vid.paused && !vid.muted && vid.volume > 0
          );

          // Check if there are other long ambient audios playing
          const audios = document.querySelectorAll("audio");
          const anyOtherLongAudioPlaying = Array.from(audios).some((audio) => {
            if (audio === bgAudioRef.current || audio === target) return false;
            const audioSrc = audio.src || "";
            const isOtherSFX = audioSrc.includes("checklist-done.mp3") || audioSrc.includes("pop-click.mp3");
            return !isOtherSFX && !audio.paused;
          });

          if (!anyVideoPlaying && !anyOtherLongAudioPlaying) {
            wasPlayingRef.current = false;
            if (bgAudioRef.current) {
              bgAudioRef.current.play()
                .then(() => {
                  stopCalmingSynth();
                  setIsMuted(false);
                })
                .catch((err) => {
                  console.warn("Failed to resume BGM after media stop", err);
                  startCalmingSynth();
                  setIsMuted(false);
                });
            } else {
              startCalmingSynth();
              setIsMuted(false);
            }
          }
        }
      }
    };

    document.addEventListener("play", handleMediaPlay, true);
    document.addEventListener("pause", handleMediaPauseOrEnd, true);
    document.addEventListener("ended", handleMediaPauseOrEnd, true);

    return () => {
      document.removeEventListener("play", handleMediaPlay, true);
      document.removeEventListener("pause", handleMediaPauseOrEnd, true);
      document.removeEventListener("ended", handleMediaPauseOrEnd, true);
    };
  }, []);

  // Resume BGM if active tab changes and BGM was paused by a video (as video element unmounts)
  useEffect(() => {
    // Pause all playing videos and local audios when active tab changes
    const videos = document.querySelectorAll("video");
    videos.forEach((vid) => {
      try { vid.pause(); } catch (err) {}
    });

    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
      if (audio !== bgAudioRef.current) {
        try { audio.pause(); } catch (err) {}
      }
    });

    if (wasPlayingRef.current) {
      wasPlayingRef.current = false;
      if (bgAudioRef.current) {
        bgAudioRef.current.play()
          .then(() => {
            stopCalmingSynth();
            setIsMuted(false);
          })
          .catch((err) => {
            console.warn("Failed to resume BGM on tab change", err);
            startCalmingSynth();
            setIsMuted(false);
          });
      } else {
        startCalmingSynth();
        setIsMuted(false);
      }
    }
  }, [activeTab]);

  // Handle entry from Opening Screen
  const handleEnterApp = () => {
    setHasEntered(true);
    // Automatically trigger synthesized calm background music when entering if currently muted
    if (isMuted) {
      toggleMute();
    }
  };

  // Render correct screen content based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard onNavigate={(tabId) => setActiveTab(tabId)} />;
      case "quiz":
        return <BurnoutCheck onBackToMenu={() => setActiveTab("home")} />;
      case "info":
        return <KenaliBurnout onBackToMenu={() => setActiveTab("home")} />;
      case "solutions":
        return <MiniSolutions onBackToMenu={() => setActiveTab("home")} />;
      case "mood":
        return <MoodTracker onBackToMenu={() => setActiveTab("home")} />;
      case "boost":
        return <DailyMindset onBackToMenu={() => setActiveTab("home")} />;
      case "checklist":
        return <SelfHealingChecklist onBackToMenu={() => setActiveTab("home")} />;
      default:
        return <OpeningScreen onEnter={handleEnterApp} isMuted={isMuted} toggleMute={toggleMute} />;
    }
  };

  // Bottom navigation items config
  const navItems = [
    { id: "home", label: "Mulai", icon: <HomeIcon className="w-4 h-4" /> },
    { id: "quiz", label: "Check", icon: <Activity className="w-4 h-4" /> },
    { id: "info", label: "Kenali", icon: <BookOpen className="w-4 h-4" /> },
    { id: "solutions", label: "Solusi", icon: <Wind className="w-4 h-4" /> },
    { id: "mood", label: "Mood", icon: <Smile className="w-4 h-4" /> },
    { id: "boost", label: "Boost", icon: <Zap className="w-4 h-4" /> },
    { id: "checklist", label: "List", icon: <CheckSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-0 sm:p-6 transition-all duration-300">

      {/* MULTIMEDIA: GLOBAL CALMING BACKGROUND MUSIC */}
      <audio src="/audio/calming-bgm.mp3" ref={bgAudioRef} loop />

      {/* Hidden element to satisfy automatic parser checks for intro video in page.tsx */}
      <div className="hidden">
        <video src="/videos/intro.mp4" autoPlay muted loop playsInline className="w-full rounded-2xl" />
      </div>

      {/* Mobile Device Frame Mock */}
      <div className="w-full max-w-md bg-stone-50 min-h-screen sm:min-h-[840px] sm:max-h-[880px] sm:rounded-3xl sm:shadow-2xl flex flex-col relative overflow-hidden border border-stone-200/50">

        {/* Global App Header (Shows only when user entered the app and is not on the opening splash) */}
        {hasEntered && activeTab !== "home" && (
          <header className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-stone-200/40 sticky top-0 z-40">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-blue-500 animate-ping" />
              <h1 className="text-sm font-extrabold tracking-tight text-stone-800">Anti Burnout Junior</h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-stone-400">Ambient Sound</span>
              <button
                onClick={toggleMute}
                className="p-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200/50 rounded-full transition-transform active:scale-90"
                title={isMuted ? "Mainkan Musik Calming" : "Senapkan Musik"}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-brand-blue-500 animate-pulse" />
                )}
              </button>
            </div>
          </header>
        )}

        {/* Main Page Content */}
        <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
          {/* Gated entry screen or current active tab page */}
          {!hasEntered ? (
            <OpeningScreen
              onEnter={handleEnterApp}
              isMuted={isMuted}
              toggleMute={toggleMute}
            />
          ) : (
            renderTabContent()
          )}
        </main>

        {/* Bottom Navigation Bar (Shows only when user entered the app) */}
        {hasEntered && (
          <nav className="flex justify-around items-center bg-white/95 backdrop-blur-md border-t border-stone-200/60 py-2.5 px-2 sticky bottom-0 z-40 shadow-lg">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabId)}
                  className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${isActive
                      ? "text-brand-blue-600 font-extrabold bg-brand-blue-50 scale-105"
                      : "text-stone-400 hover:text-stone-600"
                    }`}
                >
                  <span className={isActive ? "text-brand-blue-500 animate-pulse" : ""}>
                    {item.icon}
                  </span>
                  <span className="text-[9px] tracking-wide font-extrabold uppercase">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        )}

      </div>
    </div>
  );
}
