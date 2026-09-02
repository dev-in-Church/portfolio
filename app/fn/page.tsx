"use client";

import { useEffect, useMemo, useState } from "react";

const galleryImages: string[] = [
  "/gallery/34.jpg",
  "/gallery/6.jpg",
  "/gallery/29.jpg",
  "/gallery/24.jpg",
  "/gallery/7.jpg",
  "/gallery/12.jpg",
  "/gallery/16.jpg",
  "/gallery/27.jpg",
  "/gallery/25.jpg",
  "/gallery/9.jpg",
  "/gallery/19.jpg",
  "/gallery/2.jpeg",
  "/gallery/14.jpg",
  "/gallery/33.jpg",
  "/gallery/5.jpg",
  "/gallery/28.jpg",
  "/gallery/13.jpg",
  "/gallery/4.jpg",
  "/gallery/23.jpg",
  "/gallery/11.jpg",
  "/gallery/22.jpg",
  "/gallery/26.jpg",
  "/gallery/3.jpeg",
  "/gallery/20.jpg",
  "/gallery/18.jpg",
  "/gallery/10.jpg",
  "/gallery/21.jpg",
  "/gallery/17.jpg",
  "/gallery/30.jpg",
  "/gallery/31.png",
  "/gallery/32.jpg",
  "/gallery/15.jpg",
  "/gallery/35.jpg",
  "/gallery/36.jpg",
  "/gallery/37.jpg",
];

// Cycled aspect ratios so images vary in size instead of all sharing the same box
const sizes = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[2/3]",
  "aspect-[5/4]",
];

// All boxes are square so rounded-full renders true circles, not ovals.
// Size variety now comes from width instead of aspect ratio.
const widths = ["w-full", "w-[85%]", "w-[70%]", "w-[95%]", "w-[80%]"];

// Offsets (rem) for up to 7 columns, reused/truncated depending on how many are active
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

export default function GalleryPage() {
  const columnCount = useColumnCount();

  const columns = useMemo(() => {
    const cols: { src: string; index: number }[][] = Array.from(
      { length: columnCount },
      () => [],
    );
    galleryImages.forEach((src, index) => {
      cols[index % columnCount].push({ src, index });
    });
    return cols;
  }, [columnCount]);

  const offsets = columnOffsetRem.slice(0, columnCount);
  const maxOffsetRem = Math.max(...offsets);

  return (
    <main className="relative min-h-screen bg-black px-6 md:px-12 py-20 md:py-28 overflow-hidden">
      {/* Background grid pattern, fading toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 85%)",
        }}
      />

      {/* Soft accent glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-red-600/20 blur-[120px]"
        aria-hidden
      />

      {/* Image grid — columns zigzag internally, but padding compensation keeps
          the top and bottom edges of the whole block flush and rectangular.
          Column count is recomputed per screen size so every image is always shown. */}
      <div className="relative max-w-7xl mx-auto flex gap-4">
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
                className={`object-contain rounded-full mx-auto aspect-square hover:scale-[1.02] transition-transform duration-300 ${
                  widths[index % widths.length]
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
