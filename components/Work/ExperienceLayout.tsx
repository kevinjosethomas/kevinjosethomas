import Link from "next/link";
import { ReactNode } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/Common/ProjectCard";
import ArrowIcon from "@/components/Common/ArrowIcon";

interface TeamMember {
  name: string;
  href?: string;
}

interface ExperienceLayoutProps {
  title: string;
  siteUrl: string;
  children: ReactNode;
  associatedProjectIds: string[];
  timeline?: string;
  team?: TeamMember[];
  teamSuffix?: string;
}

export default function ExperienceLayout({
  title,
  siteUrl,
  children,
  associatedProjectIds,
  timeline,
  team,
  teamSuffix,
}: ExperienceLayoutProps) {
  const associatedProjects = projects.filter((project) =>
    associatedProjectIds.includes(project.id),
  );

  return (
    <div className="flex w-full flex-col items-center">
      {/* Top navigation */}
      <nav className="flex w-full max-w-[1400px] items-center justify-between px-6 pt-8 pb-8 md:px-16">
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
          className="text-secondary group flex items-center gap-1.5 text-sm transition-colors hover:text-white md:hidden"
        >
          Website
          <ArrowIcon className="h-3 w-3" />
        </a>
      </nav>

      {/* Two-column layout */}
      <div className="flex w-full max-w-[1400px] flex-col gap-12 px-6 pb-16 md:flex-row md:gap-16 md:px-16">
        {/* Left column - sticky metadata */}
        <aside className="flex w-full flex-col gap-8 md:sticky md:top-8 md:w-2/5 md:shrink-0 md:self-start">
          {/* Title + website link */}
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary group hidden items-center gap-1 text-sm transition-colors hover:text-white md:flex"
            >
              <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Metadata - 2 column grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {timeline && (
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Timeline</h3>
                <p className="text-secondary text-sm">{timeline}</p>
              </div>
            )}
            {team && team.length > 0 && (
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Team</h3>
                <div className="flex flex-col">
                  {team.map((member) =>
                    member.href ? (
                      <a
                        key={member.name}
                        href={member.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary w-fit text-sm underline-offset-2 decoration-white/30 transition-colors hover:text-white hover:underline hover:decoration-white/80"
                      >
                        {member.name}
                      </a>
                    ) : (
                      <span
                        key={member.name}
                        className="text-secondary w-fit text-sm"
                      >
                        {member.name}
                      </span>
                    ),
                  )}
                  {teamSuffix && (
                    <p className="text-secondary text-sm">{teamSuffix}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Associated projects */}
          {associatedProjects.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold">Projects</h2>
              <div className="grid grid-cols-2 gap-3 [&_>_a_>_div]:md:border-r">
                {associatedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right column - scrollable content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Prose content */}
          <article className="prose-content flex flex-col gap-6">
            {children}
          </article>

        </div>
      </div>
    </div>
  );
}
