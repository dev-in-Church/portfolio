"use client";

import { useEffect, useRef } from "react";

export function NetflixIntro({ onFinish }: { onFinish: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const playSound = async () => {
      try {
        await audioRef.current?.play();
        console.log("Sound playing");
      } catch (e) {
        console.log("Still blocked (but shouldn't be now)");
      }
    };

    playSound();

    timer = setTimeout(() => {
      onFinish();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <audio ref={audioRef}>
        <source src="/sounds/netflix-intro.mp3" type="audio/mpeg" />
      </audio>

      <div className="text-red-600 text-7xl font-black tracking-widest animate-pulse">
        UNDO
      </div>
    </div>
  );
}
