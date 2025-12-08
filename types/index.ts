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
