export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  images: string[];
}

export const timelineEntries: TimelineEntry[] = [
  {
    date: "2025-03-03",
    title: "Organized Hack Club Scrapyard Flagship in Austin, TX",
    description:
      "We brought together 100 students from around the world to code together and build the scrappiest projects ever. In two weeks, on March 15-16, we're running 80+ satellite hackathons in cities around the world! See scrapyard.hackclub.com",
    images: [
      "/images/timeline/scrapyard-1.jpeg",
      "/images/timeline/scrapyard-2.jpeg",
      "/images/timeline/scrapyard-3.jpg",
      "/images/timeline/scrapyard-4.jpg",
    ],
  },
  {
    date: "2025-02-25",
    title: "Contracted for K-Scale Labs (YC24) in Palo Alto, CA",
    description:
      "Spent the week building robot heads for an opensource humanoid robotics startup in Palo Alto!",
    images: [
      "/images/timeline/kscale-1.jpeg",
      "/images/timeline/kscale-2.jpeg",
      "/images/timeline/kscale-3.jpeg",
      "/images/timeline/kscale-4.jpeg",
      "/images/timeline/kscale-5.jpeg",
    ],
  },
  {
    date: "2024-11-16",
    title: "Won 1st place at UBC's Ascend Business Case Competition",
    description:
      "Worked with classmates to place 1st in the Novice Category at the Ascend Business Case Competition at UBC Sauder, competing against 150 high school students in developing an international expansion plan for Lotte Yukimi Daifuku.",
    images: ["/images/timeline/ascend-1.jpg", "/images/timeline/ascend-2.jpg"],
  },
  {
    date: "2024-09-30",
    title: "Organized yvrHacks—British Columbia's biggest youth hackathon",
    description:
      "Led the British Columbia Youth Collective to organize the biggest youth hackathon in British Columbia: 60+ students, $4000+ prizes and 500+ hours of collective hacking! See yvrhacks.ca",
    images: [
      "/images/timeline/yvrhacks-1.jpg",
      "/images/timeline/yvrhacks-2.jpg",
      "/images/timeline/yvrhacks-3.jpg",
      "/images/timeline/yvrhacks-4.jpg",
    ],
  },
];

export default timelineEntries;
