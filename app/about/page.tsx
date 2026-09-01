import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export default function AboutPage() {
  const skills = [
    { name: "React", Icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white px-6 md:px-12 py-20 md:py-28 overflow-hidden">
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

      <div className="relative max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 sm:gap-10 items-start">
        {/* Photo */}
        <img
          src="/pfp.jpg"
          alt="Emmanuel Ambundo"
          className="sm:row-start-1 w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shrink-0"
        />

        {/* Identity */}
        <div className="sm:row-start-1">
          <h1 className="text-3xl font-black leading-tight">
            Emmanuel Ambundo
          </h1>
          <p className="mt-1 text-gray-400">Full-Stack Developer</p>
        </div>

        {/* Bio — spans both columns on sm+ */}
        <p className="sm:row-start-2 sm:col-start-2 text-gray-300 text-lg leading-relaxed max-w-[65ch]">
          Full-Stack Developer specializing in the PERN stack. I build scalable,
          fast, and modern web applications with a strong focus on UX,
          performance, and clean architecture.
        </p>

        {/* GIF — desktop only, sits beside the XP card */}
        <div className="hidden sm:flex sm:row-start-3 sm:col-start-1 items-center justify-center">
          <img
            src="/xp.webp"
            alt=""
            className="w-28 h-28 rounded-2xl object-cover"
          />
        </div>

        {/* Currently building at */}
        <div className="sm:row-start-3 sm:col-start-2 w-full">
          <h2 className="text-sm text-gray-500 mb-3">XP: Tech Lead@ </h2>

          <a
            href="https://www.sporttechies.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center rounded-lg p-4 border bg-zinc-900 transition-colors duration-300"
          >
            <img
              src="/lg.png"
              alt="SportTechies Innovations logo"
              className="max-h-10 w-auto invert brightness-0 opacity-60 group-hover:opacity-100 hover:brightness-100 hover:invert-0 transition duration-300"
            />
          </a>
        </div>

        {/* Skills */}
        <div className="sm:row-start-4 sm:col-start-2 flex flex-wrap gap-3">
          {skills.map(({ name, Icon, color }) => (
            <span
              key={name}
              title={name}
              aria-label={name}
              className="flex items-center justify-center w-11 h-11 bg-white/10 rounded-full"
            >
              <Icon size={20} color={color} />
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
