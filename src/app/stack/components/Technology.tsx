"use client";

import { motion } from "framer-motion";

import { TechnologyInterface } from "@/types";

export default function Technology(props: TechnologyInterface) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 0, opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.2 + 0.05 * (props.order || 1) }}
      className="flex select-none items-center gap-2"
    >
      <img src={props.icon} alt={props.name} className="h-4 w-4" />
      <p className="whitespace-nowrap text-sm text-[#CCC]">{props.name}</p>
    </motion.div>
  );
}
