import { motion } from "framer-motion";

import { Repository as RepositoryType } from "@/types";

export default function Repository(props: RepositoryType) {
  return (
    <motion.a
      href={props.url}
      target="_blank"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * (props.order || 0.1) }}
      className="flex flex-col justify-between gap-4 rounded-lg border border-white border-opacity-20 p-4 transition duration-300 hover:bg-white hover:bg-opacity-5"
    >
      <div className="flex flex-col">
        <h3 className="text-lg font-medium text-white">{props.name}</h3>
        <p className="text-sm font-light text-white text-opacity-80">
          {props.description}
        </p>
      </div>
      <div className="flex items-center gap-2 text-white">
        <Tag label={props.language} />
        <Tag label={props.stars.toString()} />
        <Tag label={props.forks.toString()} />
      </div>
    </motion.a>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap rounded bg-white bg-opacity-10 px-3 py-1">
      <p className="text-sm font-light text-white">{label}</p>
    </div>
  );
}
