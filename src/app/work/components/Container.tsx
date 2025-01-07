"use client";

import { motion } from "framer-motion";
import { Fragment, useState } from "react";

import Award from "./Award";
import Project from "./Project";
import Hackathon from "./Hackathon";
import {
  AwardInterface,
  ProjectInterface,
  HackathonInterface,
  RepositoryInterface,
} from "@/types";
import Repository from "./Repository";

export default function Container({
  AWARDS,
  PROJECTS,
  HACKATHONS,
  OPENSOURCE,
}: {
  AWARDS: AwardInterface[];
  PROJECTS: ProjectInterface[];
  HACKATHONS: HackathonInterface[];
  OPENSOURCE: RepositoryInterface[];
}) {
  const screens = ["projects", "hackathons", "opensource", "awards"];

  const [screen, setScreen] = useState(screens[0]);

  return (
    <div className="order-2 flex w-full flex-col items-start gap-4 md:order-1 md:w-1/2">
      <div className="flex items-center rounded-full border-2 border-white border-opacity-20">
        {screens.map((s, i) => (
          <div
            key={i}
            className="relative cursor-pointer px-2 py-1 md:px-3 xl:px-6"
            onClick={() => setScreen(s)}
          >
            <p className="select-none text-sm capitalize text-white md:text-base xl:text-lg">
              {s}
            </p>
            {screen == s && (
              <motion.div
                layoutId="Highlight"
                className="absolute left-0 top-0 h-full w-full rounded-full bg-white bg-opacity-10"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col items-start gap-4">
        {screen == "projects" ? (
          PROJECTS.map((project: ProjectInterface, i: number) => (
            <Project key={i} {...project} />
          ))
        ) : screen == "hackathons" ? (
          <Fragment>
            {HACKATHONS.map((hackathon: HackathonInterface, i: number) => (
              <Hackathon key={i} {...hackathon} />
            ))}
            <motion.a
              target="_blank"
              href="https://devpost.com/kevinjosethomas/challenges"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1 * (HACKATHONS.length + 1),
              }}
              className="flex w-full items-center justify-center rounded border border-white border-opacity-20 py-2 hover:bg-white hover:bg-opacity-5 xl:py-4"
            >
              <p className="font-light text-white xl:text-lg">
                See my Devpost profile
              </p>
            </motion.a>
          </Fragment>
        ) : screen == "opensource" ? (
          <div className="grid w-full auto-rows-fr grid-cols-2 gap-4">
            {OPENSOURCE.map((repository, i) => (
              <Repository key={i} order={i} {...repository} />
            ))}
          </div>
        ) : (
          AWARDS.map((awards, i) => <Award key={i} {...awards} />)
        )}
      </div>
    </div>
  );
}
