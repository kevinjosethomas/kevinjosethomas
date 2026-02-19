import Link from "next/link";
import { ReactNode } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/Common/ProjectCard";
import ArrowIcon from "@/components/Common/ArrowIcon";

interface ExperienceLayoutProps {
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
      <nav className="flex w-full max-w-[680px] items-center justify-between px-6 pt-8 pb-16 md:px-0">
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
      </nav>

      {/* Title section */}
      <header className="flex w-full max-w-[680px] flex-col items-center gap-2 px-6 pb-16 md:px-0">
        <h1 className="text-center text-4xl font-bold italic tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="text-secondary text-center text-base">
          {subtitle}, {dateRange}
        </p>
      </header>

      {/* Metadata section */}
      {(timeline || overview || role || tools) && (
        <div className="flex w-full max-w-[680px] flex-col gap-8 px-6 pb-12 md:flex-row md:gap-16 md:px-0">
          <div className="flex flex-col gap-6 md:w-2/5">
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
          <div className="flex flex-col gap-6 md:w-3/5">
            {overview && (
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Overview</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {overview}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="w-full max-w-[680px] px-6 md:px-0">
        <div className="border-border border-t" />
      </div>

      {/* Prose content */}
      <article className="prose-content flex w-full max-w-[680px] flex-col gap-6 px-6 py-16 md:px-0">
        {children}
      </article>

      {/* Associated projects */}
      {associatedProjects.length > 0 && (
        <>
          <div className="w-full max-w-[680px] px-6 md:px-0">
            <div className="border-border border-t" />
          </div>
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
