"use client";

import { motion } from "framer-motion";

import { Hackathon as HackathonType } from "@/types";

export default function Hackathon(props: HackathonType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * props.order }}
      className="flex w-full flex-col gap-2 overflow-hidden rounded-lg border border-white border-opacity-20 p-4 transition duration-300 hover:bg-white hover:bg-opacity-5"
    >
      <div className="flex w-full flex-col">
        <div className="flex flex-row items-center">
          <h3 className="text-lg font-medium text-white">{props.name}</h3>
          <p>{props.organizer}</p>
        </div>
        <p className="text-sm font-light text-white text-opacity-80">
          {props.description}
        </p>
      </div>
      <div className="flex w-full flex-row gap-2 overflow-scroll">
        {props.winner && <Tag label="Winner" color="bg-yellow-700" />}
        {props.prize && <Tag label={props.prize} color="bg-yellow-700" />}
        {props.digital ? (
          <Tag label="Digital" color="bg-sky-700" />
        ) : (
          <Tag label="In-Person" color="bg-green-700" />
        )}
      </div>
    </motion.div>
  );
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <div
      className={`flex items-center gap-2 whitespace-nowrap rounded bg-opacity-40 px-3 py-1 ${color}`}
    >
      <p className="text-sm font-light text-white text-opacity-80">{label}</p>
    </div>
  );
}
