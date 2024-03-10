type Project = {
  order: number;
  status: string;
  slug: string;
  name: string;
  stat: { label: string; color: string }[];
  tags: { label: string; color: string }[];
  description: string;
};

export type { Project };
