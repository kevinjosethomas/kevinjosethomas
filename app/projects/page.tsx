import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const midpoint = Math.ceil(projects.length / 2);

  return (
    <div className="flex w-full flex-col items-start justify-start p-6 md:p-0">
      <div className="border-border grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:border-b">
        <div className="top-0 flex flex-col items-start justify-start gap-4 self-start p-0 md:sticky md:p-16">
          <h3 className="text-2xl font-semibold">Projects</h3>
          <p className="text-secondary text-base">
            I build across domains to learn fast and contribute everywhere I
            can—whether it&apos;s robotics, applied ML, accessibility, or
            anything in between.
          </p>
        </div>

        <div className="border-border flex flex-col items-center gap-6 py-0 md:items-end md:border-x md:py-16 md:pl-16">
          {projects.slice(0, midpoint).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 py-0 md:items-end md:py-16 md:pl-16">
          {projects.slice(midpoint).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
