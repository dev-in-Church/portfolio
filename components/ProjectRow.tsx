"use client";

import { motion } from "framer-motion";
import { Play, Github } from "lucide-react";

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
  return (
    <section className="px-6 md:px-12 py-8 text-white">
      {/* Row Title */}
      <h2 className="text-2xl font-bold mb-5">{title}</h2>

      {/* Horizontal Scroll */}
      <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
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
                  onClick={() => window.open(project.live, "_blank")}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <Play className="w-5 h-5 fill-black" />
                </button>

                {/* GitHub */}
                {project.github && (
                  <button
                    onClick={() => window.open(project.github, "_blank")}
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
    </section>
  );
}
