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
    timeline: "Jul 2024 - Present, Toronto",
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
    timeline: "2021 - 2024",
    overview:
      "Minecraft server listing platform that served 300,000+ users and connected 200+ servers to 20,000 new players.",
    associatedProjectIds: ["minecraft"],
    team: [
      { name: "Milo Weinberg", href: "https://github.com/iapetus-11" },
    ],
  },
];
