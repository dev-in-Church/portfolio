"use client";

import { useEffect, useState } from "react";
import { NetflixIntro } from "@/components/NetflixIntro";
import { HeroSection } from "@/components/HeroSection";
import { ProjectRow } from "@/components/ProjectRow";
import { projectRows } from "@/lib/projects";
import { ClientLogos } from "@/components/ClientLogos";
import { clients } from "@/lib/clients";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasStarted = sessionStorage.getItem("started");

    if (hasStarted) {
      setStarted(true);
    }

    setReady(true);
  }, []);

  const startExperience = () => {
    sessionStorage.setItem("started", "true");

    setStarted(true);
    setShowIntro(true);
  };

  const finishIntro = () => {
    setShowIntro(false);
  };

  if (!ready) return null;

  // GATE SCREEN (NO NAV, NO FOOTER)
  if (!started) {
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
          <p className="text-sm tracking-wide text-gray-400 mb-3">
            Emmanuel Ambundo
          </p>
          <h1 className="text-2xl md:text-3xl font-black mb-8">
            Full-Stack Developer Portfolio
          </h1>

          <button
            onClick={startExperience}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-bold text-lg transition-colors duration-200"
          >
            Enter Portfolio
          </button>
        </div>
      </div>
    );
  }

  // APP MODE (WITH NAV + FOOTER)
  return (
    <>
      {showIntro && <NetflixIntro onFinish={finishIntro} />}

      {!showIntro && (
        <>
          <main className="bg-black min-h-screen">
            <HeroSection />

            <div className="relative z-20 -mt-24 space-y-2 pb-4">
              {projectRows.map((row, index) => (
                <ProjectRow
                  key={index}
                  title={row.title}
                  projects={row.projects}
                />
              ))}
            </div>

            <ClientLogos clients={clients} />
          </main>
        </>
      )}
    </>
  );
}
