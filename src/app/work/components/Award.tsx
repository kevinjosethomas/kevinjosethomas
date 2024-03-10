"use client";

import { motion } from "framer-motion";

import { Award as AwardType } from "@/types";

export default function Award(props: AwardType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * (props.order || 0.1) }}
      className="flex w-full flex-col gap-2 overflow-hidden rounded-lg border border-white border-opacity-20 p-4 transition duration-300 hover:bg-white hover:bg-opacity-5"
    >
      <div className="flex w-full flex-col">
        <div className="flex flex-row items-center gap-1">
          <h3 className="font-medium text-white xl:text-lg">{props.name}</h3>
          <p className="mt-1 text-xs font-light text-white text-opacity-80">
            by {props.organizer} ({props.time})
          </p>
        </div>
        <p className="text-xs font-light text-white text-opacity-80 xl:text-sm">
          {props.description}
        </p>
      </div>
    </motion.div>
  );
}
