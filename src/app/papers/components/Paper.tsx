"use client";

import { motion } from "framer-motion";

import { Paper as PaperType } from "@/types";

export default function Paper(props: PaperType) {
  return (
    <motion.a
      target="_blank"
      href={`/papers/${props.order}.pdf`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * (props.index || 0.1) }}
      className="group flex w-full grid-cols-10 flex-col items-start justify-start gap-2 rounded px-2 py-1 transition duration-300 hover:bg-white hover:bg-opacity-10 md:grid md:gap-4"
    >
      <div className="relative col-span-7 flex w-full items-center gap-2 overflow-hidden">
        <img src="/icons/paper.svg" alt="Paper" className="w-3 opacity-75" />
        <img
          src="/icons/paper-solid.svg"
          alt="Paper"
          className="absolute left-0 w-3 opacity-0 transition duration-300 group-hover:opacity-100"
        />
        <p className="truncate text-white text-opacity-75">{props.name}</p>
      </div>
      <div className="col-span-3 flex items-center justify-end gap-4">
        <div className="flex items-center gap-1">
          {props.tags.map((tag, index) => (
            <Tag key={index} {...tag} />
          ))}
        </div>
        <p className="text-white text-opacity-75">{props.date}</p>
      </div>
    </motion.a>
  );
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <div className="relative flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded px-2 py-0.5">
      <div
        className="absolute z-0 h-full w-full opacity-20"
        style={{ backgroundColor: color }}
      />
      <p className="z-10 text-xs font-light text-white text-opacity-50">
        {label}
      </p>
    </div>
  );
}
