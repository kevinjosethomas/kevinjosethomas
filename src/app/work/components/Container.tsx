"use client";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";

import Project from "./Project";
import Hackathon from "./Hackathon";
import { Project as ProjectType, Hackathon as HackathonType } from "@/types";

export default function Container({
  projects,
  hackathons,
}: {
  projects: ProjectType[];
  hackathons: HackathonType[];
}) {
  const screens = ["Projects", "Hackathons", "Awards"];
  const [screen, setScreen] = useState(screens[0]);

  return (
    <div className="flex w-1/2 flex-col items-start gap-4">
      <div className="flex items-center rounded-full border-2 border-white border-opacity-20">
        {screens.map((s) => (
          <div
            className="relative cursor-pointer px-6 py-1"
            onClick={() => setScreen(s)}
          >
            <p className="text-lg text-white">{s}</p>
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
        {screen == "Projects" ? (
          projects.map((project, i) => <Project key={i} {...project} />)
        ) : screen == "Hackathons" ? (
          <Fragment>
            {hackathons.map((hackathon, i) => (
              <Hackathon key={i} {...hackathon} />
            ))}
            <a
              target="_blank"
              href="https://devpost.com/kevinjosethomas/challenges"
              className="flex w-full items-center justify-center rounded border border-white border-opacity-20 py-4 hover:bg-white hover:bg-opacity-5"
            >
              <p className="text-lg font-light text-white">
                See my Devpost profile
              </p>
            </a>
          </Fragment>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
