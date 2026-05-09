import { projectRows } from "@/lib/projects";
import { notFound } from "next/navigation";

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
    <main className="h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-black">{project.title}</h1>

          <p className="text-gray-300 text-lg">{project.description}</p>

          {/* Tech */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs rounded bg-white/10 text-gray-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <a
              href={project.live}
              target="_blank"
              className="px-6 py-3 bg-white text-black rounded font-bold"
            >
              Live Demo
            </a>

            <a
              href={project.github}
              target="_blank"
              className="px-6 py-3 bg-white/20 rounded font-bold"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
