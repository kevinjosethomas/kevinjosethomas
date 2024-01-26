import Tippy from "@tippyjs/react";
import { motion } from "framer-motion";

export default function Hackathons() {
  const hackathons = [
    {
      name: "nwHacks",
      time: "Jan 2024",
      institution: "nwPlus",
      description: (
        <p>
          <span className="inline-block">
            For my first in-person hackathon, as one of the few high-school
            hackers, I worked with a team of UBC students to develop a ML
            image-recognition nutrition tracker in 24 hours. We won:
          </span>
          <span className="inline-block">
            • 2nd place: Healthcare & Accessibility Track
          </span>
        </p>
      ),
      digital: false,
      winner: true,
    },
    {
      name: "PantherHacks",
      time: "May 2023",
      institution: "Princeton Day School",
      description: (
        <p>
          <span className="inline-block">
            In my attempt to get back into software development, I spent 26
            hours developing a high school focused social media platform by
            myself. I received:
          </span>
          <span className="inline-block">• Honourable Mention Award</span>
        </p>
      ),
      digital: true,
      winner: true,
    },
    {
      name: "WinHacks",
      time: "March 2022",
      institution: "University of Windsor",
      description: (
        <p>
          <span className="inline-block">
            As the youngest (solo) hacker among over 400 university students, I
            developed and showcased a freelance marketplace in under 36 hours. I
            won:
          </span>

          <span className="inline-block">
            • 1st place: Project Board Revamp{" "}
            <span className="font-bold">($1500)</span>
          </span>
        </p>
      ),
      digital: true,
      winner: true,
      prize: 1500,
    },
    {
      name: "BorderHacks",
      time: "Sep 2021",
      institution: "WindsorEssex",
      description: (
        <p>
          <span className="inline-block">
            As a first-time hacker, and the youngest (solo) participant among
            over 300 university students from around the world, I won:
          </span>
          <span className="inline-block">• 1st place: Best UI / UX Design</span>
          <span className="inline-block">
            • 2nd place: Optimizing Community Services{" "}
            <span className="font-bold">($500)</span>
          </span>
        </p>
      ),
      digital: true,
      winner: true,
      prize: 500,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4">
      {hackathons.map((hackathon, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * i }}
          className="relative flex cursor-default flex-col overflow-hidden rounded-2xl border border-white border-opacity-20 md:h-24 md:flex-row 2xl:h-28 2xl:rounded-2xl 3xl:h-32"
        >
          {hackathon.winner && (
            <div className="md:flex absolute hidden py-1 items-center justify-center top-8 bg-opacity-60 -right-16 bg-blue-500 rotate-45 w-40">
              <p className="text-xs mr-8 font-bold text-white">WINNER</p>
            </div>
          )}
          {hackathon.winner && (
            <div className="flex md:hidden absolute py-1 items-center justify-center bottom-6 bg-opacity-60 -right-16 bg-blue-500 -rotate-45 w-40">
              <p className="text-xs mr-8 font-bold text-white">WINNER</p>
            </div>
          )}
          <div className="flex h-full w-full flex-row justify-between border-white border-opacity-20 bg-[#1A1A1A] p-3 md:w-40 md:flex-col md:border-r 2xl:w-48 2xl:p-4 3xl:w-64 3xl:p-5">
            <div className="flex flex-col">
              <div className="flex flex-row gap-3 items-center">
                <p className="font-std text-sm tracking-wide text-white md:text-base 2xl:text-lg 3xl:text-2xl">
                  {hackathon.name}
                </p>
                <Tippy
                  content={hackathon.digital ? "Digital" : "In-Person"}
                  arrow={false}
                >
                  <div
                    className={`rounded-full w-2 h-2 ${
                      hackathon.digital ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  />
                </Tippy>
              </div>
              <p className="text-xs font-light leading-tight tracking-wide text-white 2xl:text-sm 3xl:text-base">
                {hackathon.institution}
              </p>
            </div>
            <p className="text-xs font-extralight leading-tight tracking-wide text-white 2xl:text-sm 3xl:text-base">
              {hackathon.time}{" "}
              {hackathon.prize && (
                <span className="text-blue-500 font-semibold">{`($${hackathon.prize})`}</span>
              )}
            </p>
          </div>
          <div className="flex flex-1 flex-col items-start gap-1 p-3 2xl:p-4 3xl:gap-0 3xl:p-5">
            <p className="text-xs leading-[1.125rem] font-light text-white 2xl:text-sm 3xl:text-lg">
              {hackathon.description}
            </p>
          </div>
        </motion.div>
      ))}
      <a
        href="https://devpost.com/kevinjosethomas"
        target="_blank"
        rel="noreferrer"
        className="flex w-full border rounded-2xl bg-white transition hover:bg-opacity-10 bg-opacity-0 border-white border-opacity-20 items-center justify-center py-2"
      >
        <p className="text-white text-">See Devpost</p>
      </a>
    </div>
  );
}
