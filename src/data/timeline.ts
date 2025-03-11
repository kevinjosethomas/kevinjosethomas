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
      "We raised C$200,000 and flew in 100 students from around the world to build the scrappiest projects in Austin, TX. In two weeks, on March 15-16, we're running 80+ satellite hackathons in cities around the world! See [scrapyard.hackclub.com](https://scrapyard.hackclub.com)",
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
      "Worked with classmates to place 1st in the Novice Category at the [Ascend Business Case Competition](https://www.ascendcompetition.org/) at UBC Sauder, competing against 150 high school students in developing an international expansion plan for Lotte Yukimi Daifuku.",
    images: ["/images/timeline/ascend-1.jpg", "/images/timeline/ascend-2.jpg"],
  },
  {
    date: "2024-09-30",
    title: "Organized yvrHacks—British Columbia's biggest youth hackathon",
    description:
      "Led the British Columbia Youth Collective to organize the biggest youth hackathon in British Columbia: 60+ students, $4000+ prizes and 500+ hours of collective hacking! See [yvrhacks.ca](https://bcydc.ca/program/yvrhacks)",
    images: [
      "/images/timeline/yvrhacks-1.jpg",
      "/images/timeline/yvrhacks-2.jpg",
      "/images/timeline/yvrhacks-3.jpg",
      "/images/timeline/yvrhacks-4.jpg",
    ],
  },
  {
    date: "2024-09-15",
    title: "Attended Hack the North at the University of Waterloo!",
    description:
      "Spent the weekend building [Sign Engine](https://devpost.com/software/sign-engine), a modular sign language processing architecture to enable real-time sign language translation in various use-cases. In addition to building the modular API, I implemented the API in two client applications: a Chrome extension that adds a sign language interpreter to YouTube videos, and a web application that reads users' lips (using the Symphonic Labs API) and translates into ASL",
    images: [
      "/images/timeline/hackthenorth-1.jpg",
      "/images/timeline/hackthenorth-2.jpg",
    ],
  },
  {
    date: "2024-07-24",
    title: "Spent a week on a train hackathon across Canada",
    description:
      "Spent the weekend with 50 other high school students from around the world onboard the [Hack Club Boreal Express](https://boreal.hackclub.com), a 7-day hackathon onboard a train across Canada! We were hit by the Jasper wildfires so we couldn't make it to Montreal, but we toured the Linus Tech Tips office and had a great time in Vancouver!",
    images: [
      "/images/timeline/boreal-1.jpg",
      "/images/timeline/boreal-2.jpg",
      "/images/timeline/boreal-3.png",
    ],
  },
  {
    date: "2024-05-25",
    title: "Published my work on Sign Language Processing",
    description:
      "Gave a talk about my sign language work (An Open-Source American Sign Language Fingerspell Recognition and Semantic Pose Retrieval Interface) to my classmates at Burnaby South, as well as UBC's SLPAA research team. Presented and shared my work through my [demo YouTube video](https://www.youtube.com/watch?v=uuPxMWQRoXc), and published my preprint on Cornell University's [arXiv](https://arxiv.org/abs/2408.09311)!",
    images: [
      "/images/timeline/asl-1.png",
      "/images/timeline/asl-2.jpg",
      "/images/timeline/asl-3.jpg",
      "/images/timeline/asl-4.jpg",
      "/images/timeline/asl-5.jpg",
      "/images/timeline/asl-6.jpg",
    ],
  },
  {
    date: "2024-02-11",
    title: "Attended the Hack Club Leaders' Summit in San Francisco",
    description:
      "Spent the weekend with 50 other high school students from around the world at the first ever [Hack Club Leaders' Summit](https://summit.hackclub.com) in San Francisco! Iterated on cool projects to bring back to our local program clubs, met other leaders from around the world, and discussed the future with Tom Preston-Werner, the Founder of GitHub!",
    images: ["/images/timeline/summit-1.jpg", "/images/timeline/summit-2.jpg"],
  },
];

export default timelineEntries;
