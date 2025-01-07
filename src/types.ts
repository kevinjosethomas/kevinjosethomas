type Tag = {
  name: string;
  color: string;
};

interface ProjectInterface {
  id?: number;
  status: string;
  slug: string;
  name: string;
  tags: Tag[];
  description: string;
  stat?: Tag;
  href?: string;
}

interface HackathonInterface {
  order?: number;
  winner: boolean;
  digital: boolean;
  prize: string;
  name: string;
  organizer: string;
  time: string;
  description: string;
}

interface AwardInterface {
  order?: number;
  name: string;
  organizer: string;
  time: string;
  description: string;
}

interface RepositoryInterface {
  order?: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

interface StackInterface {
  order?: number;
  icon: string;
  color: string;
  name: string;
  description: string;
}

interface TechnologyInterface {
  order?: number;
  icon: string;
  name: string;
}

interface PaperInterface {
  index?: number;
  name: string;
  date: string;
  href: string;
  tags: { label: string; color: string }[];
}

export type {
  ProjectInterface,
  HackathonInterface,
  AwardInterface,
  RepositoryInterface,
  StackInterface,
  TechnologyInterface,
  PaperInterface,
};
