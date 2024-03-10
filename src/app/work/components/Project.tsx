"use client";

import { motion } from "framer-motion";

import { Project as ProjectType } from "../types";

export default function Project(props: ProjectType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * props.order }}
      className="w-full flex flex-col rounded-lg border border-white hover:bg-white transition duration-300 hover:bg-opacity-5 border-opacity-20 overflow-hidden"
    >
      <div className="flex flex-row items-start gap-4 w-full p-4">
        <img
          src={`/images/projects/${props.slug}.png`}
          className="w-16 h-16 rounded"
          alt={props.name}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-white text-lg font-medium">{props.name}</h3>
            <div
              className={`w-2 h-2 rounded-full ${
                props.status == "online"
                  ? "bg-green-600"
                  : props.status == "idle"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />
          </div>
          <p className="text-white text-sm font-light text-opacity-80">
            {props.description}
          </p>
        </div>
      </div>
      <div className="flex flex-row px-4 pb-4 gap-2 w-full overflow-scroll">
        {props.stat.map((tag, i) => (
          <Tag key={i} {...tag} highlight />
        ))}
        {props.tags.map((tag, i) => (
          <Tag key={i} {...tag} />
        ))}
      </div>
    </motion.div>
  );
}

function Tag({
  label,
  color,
  highlight,
}: {
  label: string;
  color: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        borderColor: color,
        filter: "contrast(0.3)",
      }}
      className={`flex items-center gap-2 px-3 py-1 rounded bg-white bg-opacity-10 whitespace-nowrap ${
        highlight && "border border-opacity-20"
      }`}
    >
      {!highlight && (
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}

      <p className="text-white text-sm font-light">{label}</p>
    </div>
  );
}
