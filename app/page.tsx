import { HeroSection } from "@/components/HeroSection";
import { ProjectRow } from "@/components/ProjectRow";
import { projectRows } from "@/lib/projects";
import { ClientLogos } from "@/components/ClientLogos";
import { clients } from "@/lib/clients";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <HeroSection />

      <div className="relative z-20 -mt-24 space-y-2 pb-4">
        {projectRows.map((row, index) => (
          <ProjectRow key={index} title={row.title} projects={row.projects} />
        ))}
      </div>

      <ClientLogos clients={clients} />
    </div>
  );
}
