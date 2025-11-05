import Image from "next/image";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { ReactNode } from "react";

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
      <div className="relative flex w-full flex-col items-start justify-start gap-4 overflow-hidden p-16">
        <div className="absolute top-0 right-0 -z-10">{backgroundPattern}</div>
        <div className="z-10 flex w-full max-w-2xl flex-col items-start justify-start gap-2">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-4xl font-bold">{title}</h1>
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border text-secondary flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-all hover:border-white/20 hover:text-white"
            >
              <span>View Site</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.25 group-hover:-translate-y-0.25"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
          <p className="text-secondary text-sm tracking-wider uppercase">
            {dateRange}
          </p>
        </div>
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
