type Project = {
  order?: number;
  status: string;
  slug: string;
  name: string;
  stat: { label: string; color: string }[];
  tags: { label: string; color: string }[];
  description: string;
};

type Hackathon = {
  order?: number;
  winner: boolean;
  digital: boolean;
  prize: string;
  name: string;
  organizer: string;
  time: string;
  description: string;
};

type Award = {
  order?: number;
  name: string;
  organizer: string;
  time: string;
  description: string;
};

type Repository = {
  order?: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
};

export type { Project, Hackathon, Award, Repository };
