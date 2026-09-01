"use client";

import { useEffect, useMemo, useState } from "react";

// Your 30 images — update these paths to match your actual files in /public
const images = [
  "/clap/1.webp",
  "/clap/2.webp",
  "/clap/3.gif",
  "/clap/4.gif",
  "/clap/5.webp",
  "/clap/6.gif",
  "/clap/7.gif",
  "/clap/8.webp",
  "/clap/9.webp",
  "/clap/10.gif",
  "/clap/11.gif",
  "/clap/12.gif",
  "/clap/13.gif",
  "/clap/14.webp",
  "/clap/15.gif",
  "/clap/16.webp",
  "/clap/17.gif",
  "/clap/18.webp",
  "/clap/19.webp",
  "/clap/20.webp",
  "/clap/21.gif",
  "/clap/22.webp",
  "/clap/23.gif",
  "/clap/24.gif",
  "/clap/25.webp",
  "/clap/26.gif",
  "/clap/27.gif",
];

// Same width-variation trick as the gallery, so the repeated icons don't
// look like a rigid, uniform grid.
const widths = ["w-full", "w-[85%]", "w-[70%]", "w-[95%]", "w-[80%]"];

// Offsets (rem) per column, reused/truncated depending on active column count
const columnOffsetRem = [0, 3, 1.5, 4, 0.75, 2.5, 3.5];

function useColumnCount() {
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const getCount = () => {
      const w = window.innerWidth;
      if (w >= 1024) return 7; // lg
      if (w >= 640) return 5; // sm
      return 3; // mobile
    };

    const update = () => setColumnCount(getCount());
    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columnCount;
}

export function NetflixIntro({ onFinish }: { onFinish: () => void }) {
  const columnCount = useColumnCount();

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 8500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const columns = useMemo(() => {
    const cols: { src: string; index: number }[][] = Array.from(
      { length: columnCount },
      () => [],
    );
    images.forEach((src, index) => {
      cols[index % columnCount].push({ src, index });
    });
    return cols;
  }, [columnCount]);

  const offsets = columnOffsetRem.slice(0, columnCount);
  const maxOffsetRem = Math.max(...offsets);

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden flex items-center justify-center">
      {/* Scattered background of repeated images, filling the screen */}
      <div className="absolute inset-0 flex gap-4 px-4 opacity-70">
        {columns.map((col, colIndex) => (
          <div
            key={colIndex}
            className="flex-1 flex flex-col gap-4"
            style={{
              marginTop: `${offsets[colIndex]}rem`,
              paddingBottom: `${maxOffsetRem - offsets[colIndex]}rem`,
            }}
          >
            {col.map(({ src, index }) => (
              <img
                key={index}
                src={src}
                alt=""
                className={`object-contain rounded-full mx-auto aspect-square ${
                  widths[index % widths.length]
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Fade so the scattered images don't overpower the centerpiece */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/90" />

      {/* Centerpiece */}
      <div className="relative animate-pulse">
        <img src="/clap.webp" alt="" className="w-32 md:w-48" />
      </div>
    </div>
  );
}
