"use client";

import { useState } from "react";
import type { Project, ProjectTag } from "@/types";
import ProjectCard from "@/components/Common/ProjectCard";

const TAGS: ProjectTag[] = ["Engineering", "Research", "Community"];

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeTags, setActiveTags] = useState<Set<ProjectTag>>(new Set());

  const toggleTag = (tag: ProjectTag) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const filtered =
    activeTags.size > 0
      ? projects.filter((p) => p.tags.some((t) => activeTags.has(t)))
      : projects;

  return (
    <div className="flex w-full flex-col items-start justify-start p-6 md:p-16">
      <div className="mb-8 flex w-full items-center gap-3">
        <h3 className="text-2xl font-semibold">Projects</h3>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`cursor-pointer text-sm transition-colors ${
                activeTags.has(tag)
                  ? "text-white"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 md:hidden">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} compact showYear />
        ))}
      </div>

      <div className="hidden w-full grid-cols-4 gap-4 md:grid">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} compact showYear />
        ))}
      </div>
    </div>
  );
}
