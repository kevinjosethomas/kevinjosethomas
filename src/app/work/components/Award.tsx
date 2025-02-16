"use client";

import { motion } from "framer-motion";
import { AwardInterface } from "@/types";

export default function Award(props: AwardInterface) {
  return (
    <div className="relative flex w-full flex-col pl-12">
      <div className="absolute left-[11px] top-2 h-3 w-3 rounded-full bg-slate-400" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * (props.order || 0.1) }}
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
      </motion.div>
    </div>
  );
}
