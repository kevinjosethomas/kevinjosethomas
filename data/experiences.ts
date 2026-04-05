import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "kscale",
    title: "K-Scale Labs",
    siteUrl: "https://kscale.dev",
    timeline: "Winter 2025, Palo Alto",
    overview:
      "Tackling a single ambitious goal: build America's first commercially-viable, mass-market humanoid robot.",
    associatedProjectIds: ["emx", "kos"],
    team: [
      { name: "Chris Thomas", href: "https://chris.vg/" },
      { name: "Wesley Maa", href: "https://wesleymaa.com/" },
      { name: "Aaron Xie", href: "https://aaronxie.com/" },
      { name: "Michael Lutz", href: "https://michael-lutz.github.io/" },
    ],
  },
  {
    id: "csslab",
    title: "CSSLab",
    siteUrl: "https://csslab.cs.toronto.edu",
    timeline: "Summer 2024, Toronto",
    overview:
      "Building the world's most popular chess bot, and running experiments for long-term social good in a world with AI.",
    associatedProjectIds: ["maia"],
    team: [
      {
        name: "Ashton Anderson",
        href: "https://www.cs.toronto.edu/~ashton/",
      },
      {
        name: "Dmitriy Prokopchuk",
        href: "https://prokopchukdim.github.io/",
      },
      { name: "George Eilender" },
    ],
  },
  {
    id: "minecraft",
    title: "minecraft.global",
    siteUrl: "https://minecraft.global",
    timeline: "Project, 2021",
    overview:
      "Minecraft server listing platform that served 300,000+ users and connected 200+ servers to 20,000 new players.",
    associatedProjectIds: ["minecraft"],
    team: [
      { name: "Milo Weinberg", href: "https://github.com/iapetus-11" },
    ],
  },
  {
    id: "valorant",
    title: "Valorant Store Scanner",
    siteUrl: "https://github.com/kevinjosethomas/valorant-store-scanner",
    timeline: "Project, 2021",
    overview:
      "Reverse-engineered Valorant's private store API so 80,000 users could check their daily skins without launching the game.",
    associatedProjectIds: ["valorant"],
    team: [],
    tools: ["Next.js", "Fastify", "Wireshark"],
  },
  {
    id: "asl",
    title: "ASL Translation",
    siteUrl: "https://arxiv.org/abs/2408.09311",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/kevinjosethomas/sign-language-processing",
        icon: "github",
      },
      {
        label: "Paper",
        href: "https://arxiv.org/abs/2408.09311",
        icon: "arxiv",
      },
    ],
    timeline: "Project, 2024",
    overview:
      "Two-way ASL-English translation system using pose estimation and semantic retrieval, published on arXiv.",
    associatedProjectIds: ["asl"],
    team: [],
    tools: ["MediaPipe", "PointNet", "pgvector"],
  },
  {
    id: "chromeai",
    title: "ChromeAI",
    siteUrl: "https://chrome-ai.vercel.app",
    timeline: "Project, 2023",
    overview:
      "Chrome extension that brings AI to any text on the web through a right-click context menu.",
    associatedProjectIds: ["chromeai"],
    team: [],
    tools: ["React", "Fastify", "Stripe"],
  },
  {
    id: "turbo",
    title: "Turbo Browser",
    siteUrl: "https://github.com/kevinjosethomas/turbo",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/kevinjosethomas/turbo",
        icon: "github",
      },
    ],
    timeline: "Project, 2021",
    overview:
      "Developer-focused web browser built on Electron with a community of 300 beta testers.",
    associatedProjectIds: ["turbo"],
    team: [],
    tools: ["Electron", "React", "Tailwind"],
  },
  {
    id: "disbots",
    title: "disbots.gg",
    siteUrl: "https://disbots.gg",
    timeline: "Project, 2020",
    overview:
      "Discord bot listing platform used by 10,000+ server owners and 100+ bot developers.",
    associatedProjectIds: ["disbots"],
    team: [
      { name: "Milo Weinberg", href: "https://github.com/iapetus-11" },
      { name: "Paul Przybyszewski", href: "https://github.com/seven7ty" },
    ],
  },
  {
    id: "scrapyard",
    title: "Hack Club Scrapyard",
    siteUrl: "https://scrapyard.hackclub.com",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/hackclub/scrapyard",
        icon: "github",
      },
      {
        label: "Documentary",
        href: "https://www.youtube.com/watch?v=8iM1W8kXrQA",
        icon: "youtube",
      },
    ],
    timeline: "Community, 2024",
    overview:
      "Global high school hackathon with 4,500+ students across 60+ cities, organized through Hack Club.",
    associatedProjectIds: ["scrapyard"],
    team: [
      { name: "Ruby Ke" },
      { name: "Ian Madden" },
      { name: "Sam Poder", href: "https://sampoder.com/" },
    ],
  },
];
