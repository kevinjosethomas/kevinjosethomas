import { Fragment } from "react";
import { motion } from "framer-motion";

export default function Awards() {
  const awards = [
    {
      name: "SHAD Fellow",
      time: "July 2023",
      institution: "Western University",
      description: (
        <p>
          I spent one month at Western University with 80 students from across
          Canada, where we experienced post-secondary education, dorm living,
          team-driven projects, and a lot of partying!
        </p>
      ),
    },
    {
      name: "Galois Contest",
      time: "June 2023",
      institution: "University of Waterloo",
      description: (
        <p>
          <span className="inline-block">
            I wrote the 2023 CEMC Galois Contest, and achieved:
          </span>
          <span className="block">• National Honour Roll, Group IV</span>
          <span className="inline-block">• School Champion, Burnaby South</span>
        </p>
      ),
    },
    {
      name: "Math Regionals",
      time: "March 2023",
      institution: "Math Challengers",
      description: (
        <p>
          <span className="inline-block">
            I represented Burnaby South in the 2023 LM regional tournament at
            UBC
          </span>
          <span className="inline-block">
            • Top 10 Finalist, qualified for provincials
          </span>
          <span className="inline-block">
            • Top 3 Team, qualified for provincials
          </span>
        </p>
      ),
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4">
      {awards.map((award, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * i }}
          className="flex cursor-default flex-col overflow-hidden rounded-2xl border border-white border-opacity-20 md:h-24 md:flex-row 2xl:h-28 2xl:rounded-2xl 3xl:h-32"
        >
          <div className="flex h-full w-full flex-row justify-between border-white border-opacity-20 bg-[#1A1A1A] p-3 md:w-40 md:flex-col md:border-r 2xl:w-48 2xl:p-4 3xl:w-64 3xl:p-5">
            <div className="flex flex-col">
              <p className="font-std text-sm tracking-wide text-white md:text-base 2xl:text-lg 3xl:text-2xl">
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
            <p className="text-xs font-light text-white 2xl:text-sm 3xl:text-lg">
              {award.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
