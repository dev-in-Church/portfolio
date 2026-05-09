"use client";

import { useEffect, useState } from "react";
import { NetflixIntro } from "@/components/NetflixIntro";
import { HeroSection } from "@/components/HeroSection";
import { ProjectRow } from "@/components/ProjectRow";
import { projectRows } from "@/lib/projects";
import { Navigation } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "react-day-picker";

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

  // 🟢 GATE SCREEN (NO NAV, NO FOOTER)
  if (!started) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <button
          onClick={startExperience}
          className="px-6 py-3 bg-red-600 rounded-lg font-bold text-lg"
        >
          Enter Portfolio
        </button>
      </div>
    );
  }

  // 🔵 APP MODE (WITH NAV + FOOTER)
  return (
    <>
      <Navbar />
      {showIntro && <NetflixIntro onFinish={finishIntro} />}

      {!showIntro && (
        <main className="bg-black min-h-screen">
          <HeroSection />

          <div className="relative z-20 -mt-24 space-y-2 pb-20">
            {projectRows.map((row, index) => (
              <ProjectRow
                key={index}
                title={row.title}
                projects={row.projects}
              />
            ))}
          </div>
        </main>
      )}
      <Footer />
    </>
  );
}
