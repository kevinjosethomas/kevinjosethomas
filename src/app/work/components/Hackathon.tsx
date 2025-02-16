"use client";

import { motion } from "framer-motion";

import { HackathonInterface } from "@/types";

export default function Hackathon(props: HackathonInterface) {
  return (
    <div className="relative flex w-full flex-col pl-12">
      <div className="absolute left-[11px] top-2 h-3 w-3 rounded-full bg-slate-400" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 * (props.order || 0.2) }}
        className="flex w-full flex-col gap-2"
      >
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col items-start gap-0">
            <div className="flex w-full items-center justify-between">
              <h3 className="font-medium text-white xl:text-lg">
                {props.name}
              </h3>
              <p className="text-xs font-light text-white text-opacity-80">
                {props.time}
              </p>
            </div>
            <p className="text-xs font-light text-white text-opacity-80">
              by {props.organizer}
            </p>
          </div>
          <p className="text-xs font-light text-white text-opacity-80 xl:text-sm">
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
    </div>
  );
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <div
      className={`flex select-none items-center gap-2 whitespace-nowrap rounded bg-opacity-40 px-1 py-0.5 xl:px-2 ${color}`}
    >
      <p className="text-xs font-light text-white text-opacity-80">{label}</p>
    </div>
  );
}
