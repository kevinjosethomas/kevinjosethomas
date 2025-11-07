import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const leftColumn = projects.filter((_, index) => index % 2 === 0);
  const rightColumn = projects.filter((_, index) => index % 2 === 1);

  const interleavedProjects = [];
  for (let i = 0; i < Math.max(leftColumn.length, rightColumn.length); i++) {
    if (leftColumn[i]) interleavedProjects.push(leftColumn[i]);
    if (rightColumn[i]) interleavedProjects.push(rightColumn[i]);
  }

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

        <div className="flex flex-col items-center gap-6 py-0 md:hidden">
          {interleavedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="border-border hidden flex-col items-center gap-6 py-0 md:flex md:items-end md:border-x md:py-16 md:pl-16">
          {leftColumn.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="hidden flex-col items-center gap-6 py-0 md:flex md:items-end md:py-16 md:pl-16">
          {rightColumn.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
