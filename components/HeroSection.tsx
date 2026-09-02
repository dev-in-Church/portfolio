"use client";

import { motion } from "framer-motion";
import { Play, Info, Laptop } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-black text-white">
      {/* Background Video — all screen sizes */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        poster="/hero-bg.jpg"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Right-side GIF — desktop only */}
      <div className="hidden lg:block absolute right-0 bottom-0 h-full w-[45%]">
        <img
          src="/welcome2.webp"
          alt=""
          className="h-full w-full object-contain object-bottom"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Left Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-8 md:px-16">
        <div className="max-w-2xl">
          {/* Small Label */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="uppercase tracking-[0.3em] text-red-600 text-sm font-bold mb-4"
          >
            Featured Developer
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8"
          >
            Full-stack digital experiences and modern systems.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {/* Play Button */}
            <Link href="/projects">
              <button className="flex items-center cursor-pointer gap-2 px-4 py-3 bg-white text-black rounded font-bold hover:bg-gray-200 transition">
                <Laptop className="w-5 h-5" />
                View Projects
              </button>
            </Link>

            <Link href="/about">
              <button className="flex items-center cursor-pointer gap-2 px-4 py-3 bg-white/20 backdrop-blur text-white rounded font-bold hover:bg-white/30 transition">
                <Info className="w-5 h-5" />
                More Info
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
