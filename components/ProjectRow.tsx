"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Github, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  slug: string;
  image: string;
  live: string;
  github?: string;
  tech: string[];
  description: string;
}

interface ProjectRowProps {
  title: string;
  projects: Project[];
}

export function ProjectRow({ title, projects }: ProjectRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 4);

    // Determine which card is closest to the current scroll position
    const center = el.scrollLeft + el.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    const card = cardRefs.current[index];
    if (!card || !scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: card.offsetLeft - 24,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-6 md:px-12 py-8 text-white">
      {/* Row Title */}
      <h2 className="text-2xl font-bold mb-5">{title}</h2>

      {/* Row Wrapper (relative for arrow positioning) */}
      <div className="relative group/row">
        {/* Left Nav Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 border border-white/10 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 hover:bg-black/90 -translate-x-4"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Nav Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 border border-white/10 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 hover:bg-black/90 translate-x-4"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Horizontal Scroll (no scrollbar) */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              whileHover={{
                scale: 1.03,
                y: -4,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              onClick={() => {
                window.location.href = `/projects/${project.slug}`;
              }}
              className="group relative min-w-[300px] h-[180px] rounded-xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-white/20"
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                className="h-[80%] w-full object-contain object-center"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Hover Content */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 bg-black/40 backdrop-blur-[2px]">
                {/* Action Buttons */}
                <div className="flex items-center gap-3 mb-3">
                  {/* Live Demo */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.live, "_blank");
                    }}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition"
                  >
                    <Play className="w-5 h-5 fill-black" />
                  </button>

                  {/* GitHub */}
                  {project.github && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, "_blank");
                      }}
                      className="w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 transition"
                    >
                      <Github className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-1">{project.title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded bg-white/10 text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      {projects.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-1">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to project ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
