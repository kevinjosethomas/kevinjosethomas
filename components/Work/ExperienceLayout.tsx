import Link from "next/link";
import { ReactNode } from "react";
import type { TeamMember } from "@/types";
import ArrowIcon from "@/components/Common/ArrowIcon";
import TableOfContents from "@/components/Work/TableOfContents";

interface ExperienceLayoutProps {
  title: string;
  siteUrl: string;
  children: ReactNode;
  timeline: string;
  overview: string;
  team?: TeamMember[];
  teamSuffix?: string;
}

export default function ExperienceLayout({
  title,
  siteUrl,
  children,
  timeline,
  overview,
  team,
  teamSuffix,
}: ExperienceLayoutProps) {
  return (
    <div className="flex w-full flex-col items-center">
      {/* Top navigation - full width to anchor to borders */}
      <nav className="flex w-full items-center justify-between px-6 pt-8 pb-12 md:px-8">
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

      {/* Centered title block */}
      <div className="flex flex-col items-center gap-2 pb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="text-secondary text-sm">{timeline}</p>
      </div>

      {/* Two-column metadata */}
      <div className="mb-16 grid w-full max-w-[600px] grid-cols-1 gap-8 px-6 md:grid-cols-2 md:gap-16 md:px-0">
        {/* Left column - Team */}
        <div className="flex flex-col gap-6">
          {team && team.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-medium">Team</h3>
              <div className="flex flex-col">
                {team.map((member) =>
                  member.href ? (
                    <a
                      key={member.name}
                      href={member.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary w-fit text-sm underline decoration-white/20 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60"
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

        {/* Right column - Overview */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-medium">Overview</h3>
            <p className="text-secondary text-sm leading-relaxed">{overview}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-[600px] px-6 pb-16 md:px-0">
        <div
          className="absolute top-0 right-full hidden h-full xl:block"
          style={{ width: "calc((100vw - 700px) / 2)" }}
        >
          <div className="sticky top-10 flex justify-center">
            <TableOfContents />
          </div>
        </div>
        <article className="prose-content flex flex-col">
          {children}
        </article>
      </div>
    </div>
  );
}
