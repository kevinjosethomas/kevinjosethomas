"use client";

import { motion } from "framer-motion";
import { HackathonInterface } from "@/types";
import Hackathon from "./Hackathon";

export default function HackathonTimeline({
  hackathons,
}: {
  hackathons: HackathonInterface[];
}) {
  return (
    <div className="relative flex flex-col">
      <div className="absolute left-4 top-2 h-[calc(100%-16px)] w-0.5 bg-white bg-opacity-20" />
      <div className="flex flex-col gap-8">
        {hackathons.map((hackathon, index) => (
          <Hackathon key={index} {...hackathon} order={index} />
        ))}
      </div>
    </div>
  );
}
