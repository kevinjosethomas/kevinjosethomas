export interface TeamMember {
  name: string;
  href?: string;
}

export interface ExperienceLink {
  label: string;
  href: string;
  icon: "website" | "github" | "arxiv" | "youtube";
}

export interface Experience {
  id: string;
  title: string;
  siteUrl: string;
  links?: ExperienceLink[];
  timeline: string;
  overview: string;
  associatedProjectIds: string[];
  team: TeamMember[];
  teamSuffix?: string;
  tools?: string[];
}

export type ProjectTag = "Engineering" | "Research" | "Community";

export interface Project {
  id: string;
  name: string;
  description: string;
  date: string;
  href: string;
  image: string;
  tags: ProjectTag[];
  github?: string;
  website?: string;
  images?: string[];
  arxiv?: string;
  youtube?: string;
  blog?: string;
}
