import Link from "next/link";
import Image from "next/image";
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
  overview?: string;
  team?: TeamMember[];
  bannerImage?: string;
  bannerLogo?: { src: string; width: number; height: number };
  bannerLogoText?: string;
}

export default function ExperienceLayout({
  title,
  siteUrl,
  children,
  associatedProjectIds,
  timeline,
  overview,
  team,
  bannerImage,
  bannerLogo,
  bannerLogoText,
}: ExperienceLayoutProps) {
  const associatedProjects = projects.filter((project) =>
    associatedProjectIds.includes(project.id),
  );

  return (
    <div className="flex w-full flex-col items-center">
      {/* Top navigation - aligned with content */}
      <nav className="flex w-full max-w-3xl items-center justify-between px-6 pt-8 pb-12">
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
      <header className="flex w-full max-w-3xl flex-col items-center gap-2 px-6 pb-12">
        <h1 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
      </header>

      {/* Banner image */}
      {bannerImage && (
        <div className="relative w-full max-w-3xl px-6 pb-12">
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              src={bannerImage}
              alt={title}
              width={1280}
              height={300}
              className="h-auto w-full select-none object-cover"
              draggable={false}
              priority
            />
            {bannerLogo && (
              <Image
                src={bannerLogo.src}
                alt={title}
                width={bannerLogo.width}
                height={bannerLogo.height}
                className="absolute right-5 bottom-5 select-none"
                draggable={false}
              />
            )}
            {bannerLogoText && (
              <p className="absolute right-5 bottom-4 text-2xl font-bold tracking-tight">
                {bannerLogoText}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Metadata section */}
      {(timeline || overview || team) && (
        <div className="flex w-full max-w-3xl flex-col gap-8 px-6 pb-12 md:flex-row md:gap-16">
          <div className="flex flex-col gap-6 md:w-2/5">
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
                        className="text-secondary text-sm underline underline-offset-2 decoration-white/30 transition-colors hover:text-white hover:decoration-white/80"
                      >
                        {member.name}
                      </a>
                    ) : (
                      <p key={member.name} className="text-secondary text-sm">
                        {member.name}
                      </p>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
          {overview && (
            <div className="flex flex-col gap-1 md:w-3/5">
              <h3 className="text-sm font-semibold">Overview</h3>
              <p className="text-secondary text-sm leading-relaxed">
                {overview}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="w-full max-w-3xl px-6">
        <div className="border-border border-t" />
      </div>

      {/* Prose content */}
      <article className="prose-content flex w-full max-w-3xl flex-col gap-6 px-6 py-16">
        {children}
      </article>

      {/* Associated projects */}
      {associatedProjects.length > 0 && (
        <>
          <div className="w-full max-w-3xl px-6">
            <div className="border-border border-t" />
          </div>
          <div className="flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
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
