import Image from "next/image";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { ReactNode } from "react";
import ArrowIcon from "./ArrowIcon";

interface ExperienceLayoutProps {
  bannerImage: string;
  bannerAlt: string;
  title: string;
  dateRange: string;
  siteUrl: string;
  children: ReactNode;
  backgroundPattern: ReactNode;
  associatedProjectIds: string[];
}

export default function ExperienceLayout({
  bannerImage,
  bannerAlt,
  title,
  dateRange,
  siteUrl,
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
      <div className="relative flex w-full flex-col items-start justify-start gap-4 overflow-hidden p-6 md:p-16">
        <div className="absolute top-0 right-0 -z-10 hidden md:block">
          {backgroundPattern}
        </div>
        <div className="z-10 flex w-full max-w-2xl flex-col items-start justify-start gap-2">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-4xl font-bold">{title}</h1>
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border text-secondary hidden items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-all hover:border-white/20 hover:text-white md:flex"
            >
              <span className="whitespace-nowrap">View Site</span>
              <ArrowIcon className="h-3 w-3" />
            </a>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="text-secondary text-sm tracking-wider uppercase">
              {dateRange}
            </p>
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border text-secondary flex items-center justify-center gap-2 rounded-md border px-3 py-1 text-sm transition-all hover:border-white/20 hover:text-white md:hidden"
            >
              <span className="whitespace-nowrap">View Site</span>
              <ArrowIcon className="h-2 w-2 md:h-3 md:w-3" />
            </a>
          </div>
        </div>
        <div className="text-secondary z-10 flex w-full max-w-2xl flex-col items-start justify-start gap-4 text-lg">
          {children}
        </div>
      </div>

      <div className="border-border flex w-full flex-col gap-6 border-t p-6 md:grid md:grid-cols-4 md:gap-0 md:p-0">
        <div className="md:border-border flex flex-col items-start justify-start md:border-r md:p-16">
          <h2 className="text-2xl font-semibold">Projects</h2>
        </div>
        <div className="flex w-full flex-col gap-6 md:col-span-3 md:grid md:grid-cols-3 md:p-16">
          {associatedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
