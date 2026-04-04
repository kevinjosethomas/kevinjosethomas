import Link from "next/link";
import { ReactNode } from "react";
import type { TeamMember } from "@/types";
import ArrowIcon from "@/components/Common/ArrowIcon";
import TableOfContents from "@/components/Work/TableOfContents";
import HashScroll from "@/components/Work/HashScroll";

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
      <HashScroll />
      {/* Minimal floating nav */}
      <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="text-secondary group flex items-center gap-2 text-sm backdrop-blur-sm transition-colors hover:text-white"
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
          className="text-secondary group flex items-center gap-1.5 text-sm backdrop-blur-sm transition-colors hover:text-white"
        >
          Website
          <ArrowIcon className="h-3 w-3" />
        </a>
      </nav>

      {/* Full-width hero */}
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-end pb-16 pt-32">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            {title}
          </h1>
          <p className="text-secondary text-sm tracking-wide">{timeline}</p>
        </div>
      </div>

      {/* Two-column metadata — wider */}
      <div className="mb-20 grid w-full max-w-[720px] grid-cols-1 gap-8 px-6 md:grid-cols-2 md:gap-16 md:px-0">
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

      {/* Main content — wider */}
      <div className="relative w-full max-w-[720px] px-6 pb-24 md:px-0">
        <div
          className="absolute top-0 right-full hidden h-full xl:block"
          style={{ width: "calc((100vw - 820px) / 2)" }}
        >
          <div className="sticky top-10 flex justify-center">
            <TableOfContents />
          </div>
        </div>
        <article className="prose-content flex flex-col">{children}</article>
      </div>
    </div>
  );
}
