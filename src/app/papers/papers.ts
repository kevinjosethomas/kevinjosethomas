import { Paper } from "@/types";

export const Papers: Paper[] = [
  {
    name: "An Open-Source American Sign Language Fingerspell Recognition and Semantic Pose Retrieval Interface",
    href: "https://arxiv.org/abs/2408.09311",
    tags: [],
    date: "Aug 17, 2024",
  },
];

export const LiteraryPapers: Paper[] = [
  {
    name: "Responsible AI: Developing Artificial Intelligence with Moral Courage",
    href: "/papers/5.pdf",
    tags: [
      { label: "Social", color: "orange" },
      { label: "Economic", color: "red" },
    ],
    date: "Apr 14, 2024",
  },
  {
    name: "The Economic Impact of NIMBYism on Vancouver’s Housing Crisis",
    href: "/papers/4.pdf",
    tags: [
      { label: "Social", color: "orange" },
      { label: "Economic", color: "red" },
    ],
    date: "Aug 2, 2024",
  },
  {
    name: "Resilience in Adversity: Systemic Oppression of Deaf and Indigenous Youth in Canada",
    href: "/papers/3.pdf",
    tags: [{ label: "Social", color: "orange" }],
    date: "Dec 5, 2023",
  },
  {
    name: "Drought to Disparity: Political Injustice in Cape Town’s Water Crisis Mitigation",
    href: "/papers/2.pdf",
    tags: [{ label: "Social", color: "orange" }],
    date: "Oct 12, 2023",
  },
  {
    name: "Fahrenheit 451 - Individuality versus Conformity in the Pursuit of an Ideal Society",
    href: "/papers/1.pdf",
    tags: [{ label: "Literary", color: "green" }],
    date: "Jun 1, 2023",
  },
];
