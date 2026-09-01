"use client";
import { useState } from "react";
import Link from "next/link";
import { projectRows } from "@/lib/projects";

import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiGraphql,
  SiDocker,
  SiFirebase,
  SiPrisma,
  SiPython,
  SiDjango,
  SiFlask,
  SiVuedotjs,
  SiAngular,
  SiGit,
  SiFigma,
  SiStripe,
  SiSocketdotio,
  SiSupabase,
  SiVercel,
  SiRedis,
  SiSqlite,
} from "react-icons/si";
import type { IconType } from "react-icons";

const TECH_ICONS: Record<string, { Icon: IconType; color: string }> = {
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "#FFFFFF" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  Express: { Icon: SiExpress, color: "#FFFFFF" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#38BDF8" },
  Tailwind: { Icon: SiTailwindcss, color: "#38BDF8" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  Redux: { Icon: SiRedux, color: "#764ABC" },
  GraphQL: { Icon: SiGraphql, color: "#E10098" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  AWS: { Icon: SiDocker, color: "#FF9900" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  Prisma: { Icon: SiPrisma, color: "#FFFFFF" },
  Python: { Icon: SiPython, color: "#3776AB" },
  Django: { Icon: SiDjango, color: "#0C4B33" },
  Flask: { Icon: SiFlask, color: "#FFFFFF" },
  "Vue.js": { Icon: SiVuedotjs, color: "#4FC08D" },
  Angular: { Icon: SiAngular, color: "#DD0031" },
  Git: { Icon: SiGit, color: "#F05032" },
  Figma: { Icon: SiFigma, color: "#F24E1E" },
  Stripe: { Icon: SiStripe, color: "#635BFF" },
  "Socket.io": { Icon: SiSocketdotio, color: "#FFFFFF" },
  Supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  Vercel: { Icon: SiVercel, color: "#FFFFFF" },
  Redis: { Icon: SiRedis, color: "#DC382D" },
  SQLite: { Icon: SiSqlite, color: "#003B57" },
};

export default function ProjectsPage() {
  const categories = ["All", ...projectRows.map((row) => row.title)];
  const [active, setActive] = useState("All");

  const projects =
    active === "All"
      ? projectRows.flatMap((row) => row.projects)
      : (projectRows.find((row) => row.title === active)?.projects ?? []);

  return (
    <main className="relative min-h-screen bg-black text-white px-6 md:px-16 py-12 pt-20 overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto">
        {/* Header row — title + category filters on the left, GIF on the right */}
        <div className="flex items-start justify-between gap-6">
          <div>
            {/* <h1 className="text-4xl font-black">Projects</h1>
            <p className="mt-2 text-gray-400">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
              {active !== "All" ? ` in ${active}` : ""}
            </p> */}
            <img
              src="/job.webp"
              alt=""
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shrink-0"
            />
            {/* Category filter */}
            {/* <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActive(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                    active === category
                      ? "bg-red-600 border-red-600 text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-white/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div> */}
          </div>

          {/* GIF */}
          <img
            src="/work.webp"
            alt=""
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shrink-0"
          />
          <img
            src="/gym.webp"
            alt=""
            className="hidden sm:block w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shrink-0"
          />
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/30 transition-colors duration-300"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-bold group-hover:text-red-500 transition-colors duration-300">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                  {project.description}
                </p>

                {project.tech && project.tech.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((tech) => {
                      const entry = TECH_ICONS[tech];
                      return (
                        <span
                          key={tech}
                          title={tech}
                          aria-label={tech}
                          className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10"
                        >
                          {entry ? (
                            <entry.Icon size={14} color={entry.color} />
                          ) : (
                            <span className="text-[10px] font-bold text-gray-300">
                              {tech.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="mt-16 text-center text-gray-500">
            No projects in this category yet.
          </p>
        )}
      </div>
    </main>
  );
}
