import Image from "next/image";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { ReactNode } from "react";

interface ExperienceLayoutProps {
  bannerImage: string;
  bannerAlt: string;
  title: string;
  children: ReactNode;
  backgroundPattern: ReactNode;
  associatedProjectIds: string[];
}

export default function ExperienceLayout({
  bannerImage,
  bannerAlt,
  title,
  children,
  backgroundPattern,
  associatedProjectIds,
}: ExperienceLayoutProps) {
  const associatedProjects = projects.filter((project) =>
    associatedProjectIds.includes(project.id),
  );

  return (
    <div>
      <Image
        className="h-full w-full object-cover"
        src={bannerImage}
        alt={bannerAlt}
        width={1280}
        height={300}
      />
      <div className="relative flex w-full flex-col items-start justify-start gap-4 overflow-hidden p-16">
        <div className="absolute top-0 right-0 -z-10">{backgroundPattern}</div>
        <h1 className="z-10 text-4xl font-bold">{title}</h1>
        <div className="text-secondary z-10 flex w-full max-w-2xl flex-col items-start justify-start gap-4 text-lg">
          {children}
        </div>
      </div>

      <div className="border-border flex w-full flex-col items-start justify-start gap-8 border-t p-16">
        <h2 className="text-2xl font-semibold">Associated Projects</h2>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {associatedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
