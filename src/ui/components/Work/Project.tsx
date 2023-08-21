import { motion } from "framer-motion";

import { Project, ProjectStatus } from "types";

export default function ProjectCard(props: Project) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * props.i }}
      className="flex h-32 items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white border-opacity-20 pl-6"
    >
      <div className="flex items-center gap-5">
        <img src={props.image} alt={props.name} className="h-16 w-16 rounded-lg" />
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <p className="font-std text-2xl tracking-wide text-white">{props.name}</p>
            <div
              className={`h-2 w-2 rounded-full ${
                props.status === ProjectStatus.ONLINE
                  ? "bg-green-600"
                  : props.status === ProjectStatus.IDLE
                  ? "bg-yellow-600"
                  : "bg-red-600"
              }`}
            />
          </div>
          <p className="max-w-xl text-lg font-light leading-tight text-white text-opacity-80">
            {props.description}
          </p>
        </div>
      </div>
      <div className="flex h-full w-64 flex-col justify-center bg-white bg-opacity-10">
        <div className="flex h-20 w-full flex-col justify-start gap-2 overflow-hidden px-3">
          <div className="flex flex-col items-start">
            <p className="text-white">• {props.time}</p>
            {props.stat && <p className="text-white">• {props.stat}</p>}
          </div>
          <div className="flex h-full w-full flex-wrap items-start gap-1">
            {props.tags.map((tag, i) => (
              <div className="flex rounded bg-white bg-opacity-10 px-2">
                <p className="text-sm text-white">{tag}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
