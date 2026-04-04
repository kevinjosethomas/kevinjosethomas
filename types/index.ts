export interface TeamMember {
  name: string;
  href?: string;
}

export interface Experience {
  id: string;
  title: string;
  siteUrl: string;
  timeline: string;
  overview: string;
  associatedProjectIds: string[];
  team: TeamMember[];
  teamSuffix?: string;
}

export interface Project {
  id: string;
  name: string;
  date: string;
  href: string;
  image: string;
  wireframeImage?: string;
  github?: string;
  website?: string;
  images?: string[];
  arxiv?: string;
  youtube?: string;
  blog?: string;
}
