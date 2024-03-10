"use client";

import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import { useSearchParams } from "next/navigation";

import Award from "./Award";
import Project from "./Project";
import Hackathon from "./Hackathon";
import {
  Project as ProjectType,
  Hackathon as HackathonType,
  Award as AwardType,
  Repository as RepositoryType,
} from "@/types";
import Repository from "./Repository";

export default function Container({
  projects,
  hackathons,
  awards,
  opensource,
}: {
  projects: ProjectType[];
  hackathons: HackathonType[];
  awards: AwardType[];
  opensource: RepositoryType[];
}) {
  const screens = ["projects", "hackathons", "opensource", "awards"];

  const search = useSearchParams();
  const initialScreen = search.get("s") || "";

  const [screen, setScreen] = useState(
    screens.includes(initialScreen) ? initialScreen : screens[0],
  );

  return (
    <div className="flex w-1/2 flex-col items-start gap-4">
      <div className="flex items-center rounded-full border-2 border-white border-opacity-20">
        {screens.map((s) => (
          <div
            className="relative cursor-pointer px-6 py-1"
            onClick={() => setScreen(s)}
          >
            <p className="text-lg capitalize text-white">{s}</p>
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
          projects.map((project, i) => (
            <Project key={i} order={i} {...project} />
          ))
        ) : screen == "hackathons" ? (
          <Fragment>
            {hackathons.map((hackathon, i) => (
              <Hackathon key={i} order={i} {...hackathon} />
            ))}
            <motion.a
              target="_blank"
              href="https://devpost.com/kevinjosethomas/challenges"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1 * (hackathons.length + 1),
              }}
              className="flex w-full items-center justify-center rounded border border-white border-opacity-20 py-4 hover:bg-white hover:bg-opacity-5"
            >
              <p className="text-lg font-light text-white">
                See my Devpost profile
              </p>
            </motion.a>
          </Fragment>
        ) : screen == "opensource" ? (
          <div className="grid w-full auto-rows-fr grid-cols-2 gap-4">
            {opensource.map((repository, i) => (
              <Repository key={i} order={i} {...repository} />
            ))}
          </div>
        ) : (
          awards.map((awards, i) => <Award key={i} order={i} {...awards} />)
        )}
      </div>
    </div>
  );
}
