"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  dark?: number;
  saturate?: number;
}

export default function ProjectCard({
  project,
  dark = 0,
  saturate = 100,
}: ProjectCardProps) {
  return (
    <Link href={project.href} className="group">
      <div className="border-border flex w-full flex-col border transition-colors hover:border-white/20 md:border-r-0">
        <div className="relative">
          {dark > 0 && (
            <div
              className="absolute top-0 left-0 z-10 h-full w-full bg-black transition-opacity duration-300 group-hover:opacity-0!"
              style={{ opacity: dark / 100 }}
            />
          )}
          <Image
            className="h-full w-full object-cover transition-all duration-300 group-hover:saturate-100!"
            src={project.image}
            alt={project.name}
            width={346}
            height={225}
            style={{
              filter: `saturate(${saturate}%)`,
            }}
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <p className="text-sm">{project.name}</p>
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
          <p className="text-secondary text-sm">{project.date}</p>
        </div>
      </div>
    </Link>
  );
}
