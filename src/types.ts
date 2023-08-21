export type Screen = {
  label: string;
  component: React.ReactElement;
};

export type Project = {
  status: ProjectStatus;
  image: any;
  name: string;
  time: string;
  stat?: string;
  description: string;
  tags: string[];
};

export enum ProjectStatus {
  OFFLINE,
  IDLE,
  ONLINE,
}
