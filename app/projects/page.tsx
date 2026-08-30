import { projectRows } from "@/lib/projects";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = projectRows.flatMap((row) => row.projects);

  return (
    <main className="min-h-screen bg-black text-white px-8 md:px-16 py-12">
      <h1 className="text-4xl font-black mb-10">All Projects</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/30 transition"
          >
            {/* Image */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[80%] group-hover:scale-105 transition duration-300 object-contain object-center"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Title */}
            <div className="absolute bottom-0 p-4">
              <h2 className="text-lg font-bold">{project.title}</h2>
              <p className="text-sm text-gray-400 line-clamp-1">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
