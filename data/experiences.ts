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
      "Computational Social Science Lab at the University of Toronto, studying human behavior through chess.",
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
];
