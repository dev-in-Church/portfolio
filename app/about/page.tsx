export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-8">
        {/* Avatar style circle */}
        <div className="w-32 h-32 mx-auto rounded-full bg-red-600 flex items-center justify-center text-3xl font-black">
          EA
        </div>

        <h1 className="text-4xl font-black">Emmanuel Ambundo</h1>

        <p className="text-gray-300 text-lg leading-relaxed">
          Full-Stack Developer specializing in the PERN stack. I build scalable,
          fast, and modern web applications with strong focus on UX,
          performance, and clean architecture.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            "React",
            "Next.js",
            "Node.js",
            "PostgreSQL",
            "Tailwind",
            "TypeScript",
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-white/10 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
