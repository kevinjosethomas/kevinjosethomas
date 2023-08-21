import { motion } from "framer-motion";

export default function Awards() {
  const awards = [
    {
      name: "shad fellow",
      time: "july 2023",
      institution: "Western University",
      description: [
        "spent an entire month at western university with 80 other students from all",
        "across canada, experiencing the ins and outs of post-secondary education, ",
        "including dorm living, higher academics, projects and a lot of partying",
      ],
    },
    {
      name: "galois contest",
      time: "june 2023",
      institution: "University of Waterloo",
      description: [
        "i wrote the 2023 galois contest as a sophomore:",
        "• national honour roll, group iv",
        "• school champion, burnaby south",
      ],
    },
    {
      name: "math challengers",
      time: "march 2023",
      institution: "Math Challengers",
      description: [
        "i represented burnaby south in the 2023 LM regional tournament at UBC",
        "• individual finalist, qualified for provincials",
        "• top 3 team, qualified for provincials",
      ],
    },
    {
      name: "winhacks 2022",
      time: "march 2022",
      institution: "University of Windsor",
      description: [
        "as the youngest hacker & winner among over uni-level 400 participants,",
        "i developed & showcased a freelance marketplace in 36 hours:",
        "• 1st place: Project Board Revamp ($1500)",
      ],
    },
    {
      name: "borderhacks 2021",
      time: "september 2021",
      institution: "University of Windsor",
      description: [
        "first hackathon; i was the youngest winner among 300 uni-level participants:",
        "• best UI / UX design award",
        "• optimizing community services with open data ($500)",
      ],
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4">
      {awards.map((award, i) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * i }}
          className="flex h-32 cursor-default overflow-hidden rounded-2xl border border-white border-opacity-20 transition duration-300 hover:bg-white hover:bg-opacity-10"
        >
          <div className="flex h-full w-64 flex-col justify-between border-r border-white border-opacity-20 bg-[#1A1A1A] p-5">
            <div className="flex flex-col">
              <p className="font-std text-2xl tracking-wide text-white">{award.name}</p>
              <p className="font-light leading-tight tracking-wide text-white">
                {award.institution}
              </p>
            </div>
            <p className="font-extralight leading-tight tracking-wide text-white">{award.time}</p>
          </div>
          <div className="flex flex-1 flex-col items-start p-5">
            {award.description.map((line) => (
              <p className="text-lg font-light text-white">{line}</p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
