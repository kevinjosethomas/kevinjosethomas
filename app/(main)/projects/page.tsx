import { projects } from "@/data/projects";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => {
    const yearA = parseInt(a.date.match(/\d{4}/)?.[0] || "0");
    const yearB = parseInt(b.date.match(/\d{4}/)?.[0] || "0");
    return yearB - yearA;
  });

  return (
    <section>
      <h1 className="title mb-8 text-2xl font-semibold tracking-tighter">
        Projects
      </h1>
      <ProjectsGrid projects={sorted} />
    </section>
  );
}
