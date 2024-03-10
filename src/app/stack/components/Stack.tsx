"use client";

import { motion } from "framer-motion";

import { Stack as StackType } from "@/types";

export default function Stack(props: StackType) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * (props.order || 1) }}
      className="flex overflow-hidden rounded-lg border border-white border-opacity-20"
    >
      <div
        className={`flex h-28 w-28 min-w-28 select-none items-center justify-center ${props.color}`}
      >
        <img
          src={props.icon}
          alt={props.name}
          draggable="false"
          className="h-8 w-8"
        />
      </div>
      <div className="flex flex-col justify-center p-4">
        <h3 className="text-lg font-medium text-white">{props.name}</h3>
        <p className="text-sm font-light text-white text-opacity-80">
          {props.description}
        </p>
      </div>
    </motion.div>
  );
}
