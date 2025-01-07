import { ProjectInterface } from "@/types";

const TAGS = {
  REACT: {
    name: "React",
    color: "#61DAFB",
  },
  NEXTJS: {
    name: "NextJS",
    color: "#000000",
  },
  TYPESCRIPT: {
    name: "TypeScript",
    color: "#3178C6",
  },
  PYTHON: {
    name: "Python",
    color: "#F7C93E",
  },
  TENSORFLOW: {
    name: "Tensorflow",
    color: "#FF6F00",
  },
  FASTIFY: {
    name: "Fastify",
    color: "#000000",
  },
  COMMUNITY: {
    name: "Community",
    color: "green",
  },
  POSTGRESQL: {
    name: "PostgreSQL",
    color: "#4169E1",
  },
  STRIPE: {
    name: "Stripe",
    color: "#635BFF",
  },
  CHROMIUM: {
    name: "Chromium",
    color: "#4285F4",
  },
  ELECTRON: {
    name: "Electron",
    color: "#47848F",
  },
  EXPRESS: {
    name: "Express",
    color: "#000000",
  },
  SOCKETIO: {
    name: "Socket.IO",
    color: "#010101",
  },
  VUE: {
    name: "Vue",
    color: "#4FC08D",
  },
};

const PROJECTS: ProjectInterface[] = [
  {
    id: 1,
    status: "online",
    slug: "asl",
    name: "Sign Language Translation",
    tags: [TAGS.NEXTJS, TAGS.PYTHON, TAGS.TENSORFLOW, TAGS.TYPESCRIPT],
    description:
      "ASL ⭤ English Translation with Google MediaPipe, PointNet, ThreeJS and Embeddings",
    href: "https://youtu.be/uuPxMWQRoXc?si=cOr5yrBeeKOqR3rd",
  },
  {
    id: 2,
    status: "online",
    slug: "maia",
    name: "Maia Chess",
    tags: [TAGS.NEXTJS, TAGS.REACT, TAGS.TYPESCRIPT],
    description:
      "Launched the Maia Chess platform, working with Dr. Anderson and researchers at UToronto’s Computational Social Science Lab",
    href: "https://maiachess.com",
  },
  {
    id: 3,
    status: "online",
    slug: "yvrhacks",
    name: "yvrHacks",
    stat: {
      name: "70+ participants",
      color: "blue",
    },
    tags: [TAGS.COMMUNITY],
    description:
      "Led 8 executives and raised $4000 to host British Columbia’s biggest high school hackathon!",
    href: "https://yvrhacks.bcydc.ca",
  },

  {
    id: 4,
    status: "online",
    slug: "bcydc",
    name: "British Columbia Youth Developer Collective",
    stat: {
      name: "300+ Members",
      color: "#3AD353",
    },
    tags: [TAGS.COMMUNITY],
    description:
      "Creating opportunities for over 300 high school students developers from across British Columbia",
    href: "https://bcydc.ca",
  },
  {
    id: 5,
    status: "online",
    slug: "portfolio",
    name: "kevinjosethomas.com",
    tags: [TAGS.REACT, TAGS.TYPESCRIPT],
    description:
      "My portfolio to showcase my interests, projects, and accomplishments",
    href: "",
  },
  {
    id: 6,
    status: "idle",
    slug: "chromeai",
    name: "ChromeAI",
    tags: [
      TAGS.CHROMIUM,
      TAGS.FASTIFY,
      TAGS.POSTGRESQL,
      TAGS.REACT,
      TAGS.TYPESCRIPT,
    ],
    description:
      "An intuitive chrome extension that puts the power of GPT at your fingertips",
    href: "",
  },
  {
    id: 7,
    status: "idle",
    slug: "minecraft.global",
    name: "minecraft.global",
    stat: {
      name: "275,000+ Visits",
      color: "#44FE8C",
    },
    tags: [TAGS.NEXTJS, TAGS.POSTGRESQL, TAGS.STRIPE],
    description:
      "A new phenomenal Minecraft server list with exciting new features and phenomenal UI",
    href: "",
  },
  {
    id: 8,
    status: "sunset",
    slug: "turbo",
    name: "Turbo",
    tags: [TAGS.CHROMIUM, TAGS.COMMUNITY, TAGS.ELECTRON, TAGS.NEXTJS],
    description:
      "An electron-based web browser equipped with a vast array of developer tools",
    href: "",
  },
  {
    id: 9,
    status: "sunset",
    slug: "disbots",
    name: "disbots.gg",
    stat: {
      name: "1000+ Monthly Users",
      color: "#7187D5",
    },
    tags: [TAGS.COMMUNITY, TAGS.EXPRESS, TAGS.SOCKETIO, TAGS.VUE],
    description:
      "A Discord bot listing website with clean intuitive UI and many new features",
    href: "",
  },
  {
    id: 10,
    status: "sunset",
    slug: "hypixel-stats",
    name: "Hypixel Stats",
    stat: {
      name: "2500+ Servers",
      color: "#F0BC3C",
    },
    tags: [TAGS.PYTHON],
    description:
      "A Discord bot that brings Hypixel player statistics to your Discord server",
    href: "",
  },
  {
    id: 11,
    status: "sunset",
    slug: "vidio",
    name: "vidio",
    stat: {
      name: "400+ Servers",
      color: "#F00",
    },
    tags: [TAGS.PYTHON],
    description:
      "A YouTube simulator Discord bot where players could roleplay youtubers",
    href: "",
  },
];

export default PROJECTS;
