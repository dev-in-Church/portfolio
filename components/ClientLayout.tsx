"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NetflixIntro } from "@/components/NetflixIntro";

type Phase = "loading" | "gate" | "intro" | "app";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const hasStarted = sessionStorage.getItem("started");
    setPhase(hasStarted === "true" ? "app" : "gate");
  }, []);

  // Preload the intro sound as soon as the gate screen shows, so it's
  // already buffered by the time the user clicks — otherwise play() has
  // to wait on a fresh network fetch, which is what caused the delay
  // (especially noticeable on the deployed, non-localhost connection).
  useEffect(() => {
    if (phase !== "gate") return;

    const audio = new Audio("/sounds/clap.wav");
    audio.preload = "auto";
    audio.load();
    audioRef.current = audio;
  }, [phase]);

  const startExperience = () => {
    sessionStorage.setItem("started", "true");
    setPhase("intro");

    // Play the already-preloaded audio instance instead of creating a new
    // Audio() here — creating it fresh at click time is what forced the
    // browser to start downloading from zero, causing the sound to lag
    // behind the visuals. Still called directly inside this click handler
    // so it stays tied to the user gesture.
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((e) => {
        console.error("Audio play failed:", e);
      });
    }
  };

  const finishIntro = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    setPhase("app");
  }, []);

  // Wait until sessionStorage has been checked
  if (phase === "loading") {
    return null;
  }

  // GATE SCREEN (NO NAV, NO FOOTER)
  if (phase === "gate") {
    return (
      <div className="relative h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden">
        {/* Background grid pattern, fading toward the edges */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 85%)",
          }}
        />

        {/* Soft accent glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600/20 blur-[120px]"
          aria-hidden
        />

        <div className="relative flex flex-col items-center text-center px-6">
          {/* <p className="text-sm tracking-wide text-gray-400 mb-3">
            Emmanuel Ambundo
          </p>
          <h1 className="text-2xl md:text-3xl font-black mb-8">
            Full-Stack Developer Portfolio
          </h1> */}
          <img src="/click-here.webp" alt="" />

          <button
            onClick={startExperience}
            className="px-6 py-3 bg-black hover:bg-gray-700 shadow-sm shadow-primary cursor-pointer rounded-lg font-bold text-lg transition-colors duration-200"
          >
            Enter Portfolio
          </button>
        </div>
      </div>
    );
  }

  // INTRO MODE (NO NAV, NO FOOTER)
  if (phase === "intro") {
    return <NetflixIntro onFinish={finishIntro} />;
  }

  // MAIN PORTFOLIO MODE
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
