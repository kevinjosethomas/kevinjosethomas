"use client";

import { motion } from "framer-motion";

import { StackInterface } from "@/types";

export default function Stack(props: StackInterface) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * (props.order || 1) }}
      className="flex overflow-hidden rounded-lg border border-white border-opacity-20 transition duration-300 hover:bg-white hover:bg-opacity-5"
    >
      <div
        className={`flex min-h-20 min-w-20 select-none items-center justify-center md:min-h-16 md:min-w-16 xl:min-h-28 xl:min-w-28 ${props.color}`}
      >
        <img
          src={props.icon}
          alt={props.name}
          draggable="false"
          className="h-8 w-8 md:h-6 md:w-6 xl:h-8 xl:w-8"
        />
      </div>
      <div className="flex flex-col justify-center p-4">
        <h3 className="font-medium text-white xl:text-lg">{props.name}</h3>
        <p className="text-xs font-light text-white text-opacity-80 xl:text-sm">
          {props.description}
        </p>
      </div>
    </motion.div>
  );
}
