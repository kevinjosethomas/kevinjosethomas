"use client";

import { useState } from "react";
import type { Project, ProjectTag } from "@/types";
import ProjectCard from "@/components/Common/ProjectCard";

const TAGS: ProjectTag[] = ["Engineering", "Research", "Community"];

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeTags, setActiveTags] = useState<Set<ProjectTag>>(
    new Set(["Engineering", "Research"]),
  );

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
    <div className="flex w-full flex-col items-start justify-start px-6 pb-6 md:px-0 md:pb-0">
      <div className="mb-8 flex w-full justify-center md:justify-end">
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

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} imageOnly />
        ))}
      </div>
    </div>
  );
}
