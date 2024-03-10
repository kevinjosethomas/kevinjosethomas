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
      className="overflo-whidden flex flex-col justify-between gap-2 rounded-lg border border-white border-opacity-20 p-4 transition duration-300 hover:bg-white hover:bg-opacity-5 xl:gap-4"
    >
      <div className="flex flex-col">
        <h3 className="font-medium text-white xl:text-lg">{props.name}</h3>
        <p className="text-xs font-light text-white text-opacity-80 xl:text-sm">
          {props.description}
        </p>
      </div>
      <div className="no-scrollbar flex w-full items-center gap-2 overflow-scroll text-white">
        {props.language && <Tag label={props.language} type="language" />}
        <Tag label={props.stars.toString()} type="stars" />
        <Tag label={props.forks.toString()} type="forks" />
      </div>
    </motion.a>
  );
}

function Tag({ label, type }: { label: string; type: string }) {
  let color;
  switch (label) {
    case "TypeScript":
      color = "bg-[#3178C6]";
      break;
    case "JavaScript":
      color = "bg-[#F7DF1E]";
      break;
    case "Python":
      color = "bg-[#FFD343]";
      break;
    case "HTML":
      color = "bg-[#E34F26";
      break;
    case "CSS":
      color = "bg-[#1572B6]";
      break;
  }

  return (
    <div className="flex items-center gap-2 whitespace-nowrap rounded bg-white bg-opacity-10 px-3 py-1">
      {type == "language" ? (
        <div className={`${color} h-1.5 w-1.5 rounded-full`} />
      ) : type == "stars" ? (
        <img
          src="/icons/star.svg"
          alt="Stars"
          className="w-3 text-white opacity-50"
        />
      ) : (
        <img
          src="/icons/fork.svg"
          alt="Forks"
          className="w-3 text-white opacity-50"
        />
      )}
      <p className="text-xs font-light text-white text-opacity-75 xl:text-sm">
        {label}
      </p>
    </div>
  );
}
