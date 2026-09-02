import { projectRows } from "@/lib/projects";
import { notFound } from "next/navigation";
import { TECH_ICONS } from "@/lib/tech-icons";
import { Play, Github, ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const project = projectRows
    .flatMap((row) => row.projects)
    .find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 py-24 overflow-hidden">
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

      {/* Bottom-right GIF — desktop only */}
      <img
        src="/did.webp"
        alt=""
        className="absolute bottom-24 sm:bottom-6 right-6  h-24  md:h-32"
      />

      <div className="relative max-w-5xl w-full">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[200px] md:h-[400px] object-contain"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black">{project.title}</h1>

            <p className="text-gray-300 text-lg leading-relaxed">
              {project.description}
            </p>

            {/* Tech — icons instead of text */}
            {project.tech && project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => {
                  const entry = TECH_ICONS[tech];
                  return (
                    <span
                      key={tech}
                      title={tech}
                      aria-label={tech}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10"
                    >
                      {entry ? (
                        <entry.Icon size={18} color={entry.color} />
                      ) : (
                        <span className="text-xs font-bold text-gray-200">
                          {tech.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded font-bold hover:bg-gray-200 transition-colors duration-200"
              >
                <Globe className="w-6 h-6" />
                Browse
              </a>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/10 rounded font-bold hover:bg-white/20 transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
