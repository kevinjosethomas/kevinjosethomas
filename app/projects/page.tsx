import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.href} className="w-full">
      <div className="flex w-full flex-col gap-4 py-8 pl-16">
        <div className="relative overflow-hidden">
          <Image
            className="h-full w-full object-cover"
            src={project.image}
            alt={project.name}
            width={592}
            height={384}
          />
        </div>
        <div className="flex items-center justify-between pr-2">
          <p className="text-lg font-medium">{project.name}</p>
          <p className="text-secondary text-sm">{project.date}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  const midpoint = Math.ceil(projects.length / 2);

  return (
    <div className="flex w-full flex-col items-start justify-start">
      <div className="border-border grid w-full grid-cols-1 gap-6 border-b md:grid-cols-3 md:gap-0">
        <div className="sticky top-0 flex flex-col items-start justify-start gap-4 self-start px-16 pt-16 md:p-16">
          <h3 className="text-2xl font-semibold">Projects</h3>
          <p className="text-secondary text-base">
            I build across domains to learn fast and contribute everywhere I
            can—whether it&apos;s robotics, applied ML, accessibility, or
            anything in between.
          </p>
        </div>

        <div className="border-border divide-border flex flex-col items-center divide-y border-x py-0 md:items-end md:py-8">
          {projects.slice(0, midpoint).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="border-border divide-border flex flex-col items-center divide-y border-r py-0 md:items-end md:py-8">
          {projects.slice(midpoint).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
