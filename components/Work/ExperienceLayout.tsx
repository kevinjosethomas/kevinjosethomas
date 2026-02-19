import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/Common/ProjectCard";
import ArrowIcon from "@/components/Common/ArrowIcon";

interface ExperienceLayoutProps {
  bannerImage: string;
  bannerAlt: string;
  title: string;
  subtitle: string;
  dateRange: string;
  siteUrl: string;
  children: ReactNode;
  associatedProjectIds: string[];
  timeline?: string;
  overview?: string;
  role?: string;
  tools?: string[];
}

export default function ExperienceLayout({
  bannerImage,
  bannerAlt,
  title,
  subtitle,
  dateRange,
  siteUrl,
  children,
  associatedProjectIds,
  timeline,
  overview,
  role,
  tools,
}: ExperienceLayoutProps) {
  const associatedProjects = projects.filter((project) =>
    associatedProjectIds.includes(project.id),
  );

  return (
    <div className="flex w-full flex-col items-center">
      {/* Top navigation */}
      <div className="flex w-full max-w-[680px] items-center justify-between px-6 pt-8 pb-12 md:px-0">
        <Link
          href="/"
          className="text-secondary group flex items-center gap-2 text-sm transition-colors hover:text-white"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </Link>
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary group flex items-center gap-1.5 text-sm transition-colors hover:text-white"
        >
          Website
          <ArrowIcon className="h-3 w-3" />
        </a>
      </div>

      {/* Title section */}
      <div className="flex w-full flex-col items-center gap-2 px-6 pb-12 md:px-0">
        <h1 className="text-center text-4xl font-bold italic md:text-5xl">
          {title}
        </h1>
        <p className="text-secondary text-center text-base">
          {subtitle}, {dateRange}
        </p>
      </div>

      {/* Hero banner image */}
      <div className="w-full max-w-[900px] px-6 pb-16 md:px-0">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image
            draggable={false}
            className="h-full w-full object-cover select-none"
            src={bannerImage}
            alt={bannerAlt}
            width={900}
            height={506}
            priority
          />
        </div>
      </div>

      {/* Metadata section */}
      {(timeline || overview || role || tools) && (
        <div className="flex w-full max-w-[680px] flex-col gap-8 px-6 pb-16 md:flex-row md:gap-16 md:px-0">
          <div className="flex flex-col gap-6 md:w-1/3">
            {timeline && (
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Timeline</h3>
                <p className="text-secondary text-sm">{timeline}</p>
              </div>
            )}
            {role && (
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Role</h3>
                <p className="text-secondary text-sm">{role}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6 md:w-2/3">
            {overview && (
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Overview</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {overview}
                </p>
              </div>
            )}
            {tools && tools.length > 0 && (
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Tools</h3>
                <div className="flex flex-col">
                  {tools.map((tool) => (
                    <p key={tool} className="text-secondary text-sm">
                      {tool}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-border w-full max-w-[680px] border-t px-6 md:px-0" />

      {/* Prose content */}
      <article className="prose-content flex w-full max-w-[680px] flex-col gap-6 px-6 py-16 md:px-0">
        {children}
      </article>

      {/* Associated projects */}
      {associatedProjects.length > 0 && (
        <>
          <div className="border-border w-full border-t" />
          <div className="flex w-full max-w-[680px] flex-col gap-8 px-6 py-16 md:px-0">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {associatedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
