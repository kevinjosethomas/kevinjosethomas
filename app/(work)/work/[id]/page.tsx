import { notFound } from "next/navigation";
import { experiences } from "@/data/experiences";
import ExperienceLayout from "@/components/Work/ExperienceLayout";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function loadExperienceContent(id: string) {
  try {
    const content = await import(`@/content/experiences/${id}.mdx`);
    return content.default;
  } catch (error) {
    console.error(`Failed to load content for experience ${id}:`, error);
    return null;
  }
}

export async function generateStaticParams() {
  return experiences.map((experience) => ({
    id: experience.id,
  }));
}

export default async function ExperiencePage({ params }: PageProps) {
  const { id } = await params;
  const experience = experiences.find((e) => e.id === id);

  if (!experience) {
    notFound();
  }

  const Content = await loadExperienceContent(id);

  if (!Content) {
    notFound();
  }

  return (
    <ExperienceLayout
      title={experience.title}
      siteUrl={experience.siteUrl}
      timeline={experience.timeline}
      overview={experience.overview}
      team={experience.team}
      teamSuffix={experience.teamSuffix}
    >
      <Content />
    </ExperienceLayout>
  );
}
