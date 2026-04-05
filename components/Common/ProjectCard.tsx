"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  dark?: number;
  saturate?: number;
  compact?: boolean;
  showYear?: boolean;
}

export default function ProjectCard({
  project,
  dark = 0,
  saturate = 100,
  compact = false,
  showYear = false,
}: ProjectCardProps) {
  const hasWireframe = !!project.wireframeImage;

  return (
    <Link href={project.href} className="group">
      <div className={`border-border flex w-full flex-col border transition-colors hover:border-white/20 ${compact ? "" : "md:border-r-0"}`}>
        <div className="relative overflow-hidden">
          {dark > 0 && (
            <div
              className="absolute top-0 left-0 z-10 h-full w-full bg-black transition-opacity duration-300 group-hover:opacity-0!"
              style={{ opacity: dark / 100 }}
            />
          )}
          {hasWireframe ? (
            <>
              <Image
                className="h-full w-full object-cover select-none"
                src={project.wireframeImage!}
                alt={`${project.name} wireframe`}
                width={346}
                height={225}
                draggable={false}
              />
              <Image
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out select-none group-hover:opacity-100"
                src={project.image}
                alt={project.name}
                width={346}
                height={225}
                style={{
                  filter: `saturate(${saturate}%)`,
                }}
                draggable={false}
              />
            </>
          ) : (
            <Image
              className="h-full w-full object-cover transition-all duration-300 select-none group-hover:saturate-100!"
              src={project.image}
              alt={project.name}
              width={346}
              height={225}
              style={{
                filter: `saturate(${saturate}%)`,
              }}
              draggable={false}
            />
          )}
        </div>
        <div className={compact ? "flex flex-col gap-1 p-3" : "flex items-center justify-between p-4"}>
          {compact ? (
            <>
              <div className="flex items-center justify-between">
                <p className="truncate text-xs font-medium">{project.name}</p>
                {showYear && (
                  <span className="text-secondary shrink-0 text-[10px]">{project.date}</span>
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
                    className="bg-white/10 text-white/40 rounded-sm px-1.5 py-0.5 text-[10px]"
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
              <p className="text-secondary shrink-0 text-sm">{project.date}</p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
