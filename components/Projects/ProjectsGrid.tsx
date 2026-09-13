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
    <div className="flex w-full flex-col items-start justify-start">
      <div className="mb-8 flex w-full justify-start">
        <div className="flex items-center gap-4">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`cursor-pointer text-sm transition-colors ${
                activeTags.has(tag)
                  ? "text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-400 hover:text-neutral-700 dark:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} imageOnly />
        ))}
      </div>
    </div>
  );
}
