import { motion } from "framer-motion";

export default function Awards() {
  const awards = [
    {
      name: "shad fellow",
      time: "july 2023",
      institution: "Western University",
      description: [
        "spent one month at western university with 80 other students from",
        "across canada, experiencing post-secondary education, dorm living,",
        "higher academics, team-driven projects and a lot of partying",
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
      name: "winhacks '22",
      time: "march 2022",
      institution: "University of Windsor",
      description: [
        "as the youngest hacker & winner among over uni-level 400 participants,",
        "i developed & showcased a freelance marketplace in 36 hours:",
        "• 1st place: Project Board Revamp ($1500)",
      ],
    },
    {
      name: "borderhacks '21",
      time: "september 2021",
      institution: "WindsorEssex",
      description: [
        "first hackathon; i was the youngest winner among 300 participants:",
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
          className="flex h-24 cursor-default overflow-hidden rounded-lg border border-white border-opacity-20 transition duration-300 hover:bg-white hover:bg-opacity-10 2xl:h-28 2xl:h-32 2xl:rounded-2xl"
        >
          <div className="flex h-full w-40 flex-col justify-between border-r border-white border-opacity-20 bg-[#1A1A1A] p-3 2xl:w-48 2xl:p-4 3xl:w-64 3xl:p-5">
            <div className="flex flex-col">
              <p className="font-std tracking-wide text-white 2xl:text-lg 3xl:text-2xl">
                {award.name}
              </p>
              <p className="text-xs font-light leading-tight tracking-wide text-white 2xl:text-sm 3xl:text-base">
                {award.institution}
              </p>
            </div>
            <p className="text-xs font-extralight leading-tight tracking-wide text-white 2xl:text-sm 3xl:text-base">
              {award.time}
            </p>
          </div>
          <div className="flex flex-1 flex-col items-start gap-1 p-3 2xl:p-4 3xl:gap-0 3xl:p-5">
            {award.description.map((line, i) => (
              <p key={i} className="text-xs font-light text-white 2xl:text-sm 3xl:text-lg">
                {line}
              </p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
