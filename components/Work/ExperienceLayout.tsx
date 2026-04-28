import { ReactNode } from "react";
import type { TeamMember, ExperienceLink } from "@/types";
import BackButton from "@/components/Work/BackButton";
import ArrowIcon from "@/components/Common/ArrowIcon";
import TableOfContents from "@/components/Work/TableOfContents";
import HashScroll from "@/components/Work/HashScroll";
import TeamList from "@/components/Work/TeamList";

function LinkIcon({ type }: { type: ExperienceLink["icon"] }) {
  switch (type) {
    case "github":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "arxiv":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/icons/arxiv.svg" alt="arXiv" className="h-4 w-4" />
      );
    case "youtube":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return <ArrowIcon className="h-3 w-3" />;
  }
}

interface ExperienceLayoutProps {
  title: string;
  siteUrl: string;
  links?: ExperienceLink[];
  children: ReactNode;
  timeline: string;
  overview: string;
  team?: TeamMember[];
  teamSuffix?: string;
  tools?: string[];
}

export default function ExperienceLayout({
  title,
  siteUrl,
  links,
  children,
  timeline,
  overview,
  team,
  teamSuffix,
  tools,
}: ExperienceLayoutProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <HashScroll />

      {/* Minimal floating nav */}
      <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
        <BackButton />
        <div className="flex items-center gap-4">
          {links && links.length > 0 ? (
            links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary group flex items-center gap-1.5 text-sm backdrop-blur-sm transition-colors hover:text-white"
              >
                <LinkIcon type={link.icon} />
                <span className="hidden sm:inline">{link.label}</span>
                <ArrowIcon className="h-3 w-3" />
              </a>
            ))
          ) : (
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary group flex items-center gap-1.5 text-sm backdrop-blur-sm transition-colors hover:text-white"
            >
              Website
              <ArrowIcon className="h-3 w-3" />
            </a>
          )}
        </div>
      </nav>

      {/* Full-width hero */}
      <div className="flex min-h-[40vh] w-full flex-col items-center justify-end pt-16 pb-16">
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
              <TeamList team={team} teamSuffix={teamSuffix} />
            </div>
          )}
          {tools && tools.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-medium">Tools</h3>
              <div className="flex flex-col">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-secondary text-sm leading-relaxed"
                  >
                    {tool}
                  </span>
                ))}
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
