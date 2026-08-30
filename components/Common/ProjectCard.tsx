"use client";

import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/Common/ArrowIcon";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  dark?: number;
  saturate?: number;
  compact?: boolean;
  showYear?: boolean;
  imageOnly?: boolean;
}

export default function ProjectCard({
  project,
  dark = 0,
  saturate = 100,
  compact = false,
  showYear = false,
  imageOnly = false,
}: ProjectCardProps) {
  const imageSizes = imageOnly
    ? "(min-width: 1400px) 564px, (min-width: 768px) calc((100vw - 272px) / 2), calc(100vw - 48px)"
    : "(min-width: 768px) 346px, calc(100vw - 48px)";

  return (
    <Link href={project.href} className="group block w-full">
      <div
        className={
          imageOnly
            ? "flex w-full flex-col"
            : `border-border flex w-full flex-col border transition-colors hover:border-white/20 ${
                compact ? "" : "md:border-r-0"
              }`
        }
      >
        <div
          className={`relative ${imageOnly ? "" : "aspect-video overflow-hidden"}`}
        >
          {dark > 0 && (
            <div
              className="absolute top-0 left-0 z-10 h-full w-full bg-black transition-opacity duration-300 group-hover:opacity-0!"
              style={{ opacity: dark / 100 }}
            />
          )}
          <Image
            className={
              imageOnly
                ? "h-auto w-full opacity-70 transition-all duration-300 select-none group-hover:opacity-100 group-hover:saturate-100!"
                : "h-full w-full object-cover transition-all duration-300 select-none group-hover:saturate-100!"
            }
            src={project.image}
            alt={project.name}
            width={2000}
            height={1220}
            sizes={imageSizes}
            unoptimized
            style={{
              filter: `saturate(${saturate}%)`,
            }}
            draggable={false}
          />
          {imageOnly && (
            <>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 flex max-w-[calc(100%-4.5rem)] items-end gap-1 text-white md:bottom-4 md:left-4 md:max-w-[calc(100%-5rem)]">
                <p className="text-sm leading-tight font-medium md:text-base">
                  {project.name}
                </p>
                <ArrowIcon className="mb-0.5 h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" />
              </div>
              <p className="absolute right-3 bottom-3 text-sm leading-tight font-medium text-white/55 md:right-4 md:bottom-4 md:text-base">
                {project.date}
              </p>
            </>
          )}
        </div>
        {imageOnly ? null : (
          <div
            className={
              compact
                ? "flex flex-col gap-1 p-3"
                : "flex items-center justify-between p-4"
            }
          >
            {compact ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="truncate text-xs font-medium">
                    {project.name}
                  </p>
                  {showYear && (
                    <span className="text-secondary shrink-0 text-[10px]">
                      {project.date}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="text-secondary text-xs leading-relaxed">
                    {project.description}
                  </p>
                )}
                <div className="flex items-center gap-1 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[10px] text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex min-w-0 items-center gap-2">
                  <p className="truncate text-sm">{project.name}</p>
                  <svg
                    className="text-secondary h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 4h6m0 0v6m0-6L10 14"
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </svg>
                </div>
                <p className="text-secondary shrink-0 text-sm">
                  {project.date}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
