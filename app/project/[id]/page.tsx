import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectLayout from "@/components/ProjectLayout";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function loadProjectContent(id: string) {
  try {
    const content = await import(`@/content/projects/${id}.mdx`);
    return content.default;
  } catch (error) {
    console.error(`Failed to load content for project ${id}:`, error);
    return null;
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const Content = await loadProjectContent(id);

  if (!Content) {
    notFound();
  }

  return (
    <ProjectLayout
      bannerImage={project.image}
      bannerAlt={project.name}
      title={project.name}
      dateRange={project.date}
      github={project.github}
      website={project.website}
      images={project.images}
    >
      <Content />
    </ProjectLayout>
  );
}
