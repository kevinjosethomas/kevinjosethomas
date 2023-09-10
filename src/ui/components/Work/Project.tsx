import { motion } from "framer-motion";
import ScrollContainer from "react-indiana-drag-scroll";

import { Project, ProjectStatus } from "types";

export default function ProjectCard(props: Project) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * props.i }}
      className="flex h-32 cursor-pointer flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white border-opacity-20 transition duration-300 hover:bg-white hover:bg-opacity-10 md:h-24 md:flex-row md:pl-4 2xl:h-32 2xl:pl-6"
    >
      <div className="flex items-center gap-3 p-4 !pb-0 md:gap-5 md:p-0">
        <img src={props.image} alt={props.name} className="h-12 w-12 rounded-lg md:h-16 md:w-16" />
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <p className="font-std text-sm tracking-wide text-white md:text-lg 2xl:text-2xl">
              {props.name}
            </p>
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
          <p className="max-w-xl text-xs font-light leading-tight text-white text-opacity-80 2xl:text-base 3xl:text-lg">
            {props.description}
          </p>
        </div>
      </div>
      <div className="flex h-full w-full flex-col justify-center bg-[#1A1A1A] px-4 md:w-48 md:min-w-[192px] md:border-l md:border-white md:border-opacity-20 md:py-4 2xl:w-56 2xl:min-w-[224px] 3xl:w-72">
        <ScrollContainer
          vertical={true}
          className="flex w-full cursor-grab select-none items-start gap-2 md:flex-wrap"
        >
          {props.stat && (
            <div className="flex rounded bg-white bg-opacity-20 px-2 py-0.5 md:px-3">
              <p className="whitespace-nowrap text-xs font-light text-white text-opacity-90 2xl:text-base 3xl:text-lg">
                {props.stat}
              </p>
            </div>
          )}
          {props.tags.map((tag, i) => (
            <div key={i} className="flex rounded bg-white bg-opacity-10 px-3 py-0.5">
              <p className="whitespace-nowrap text-xs font-light text-white text-opacity-80 2xl:text-base 3xl:text-lg">
                {tag}
              </p>
            </div>
          ))}
        </ScrollContainer>
      </div>
    </motion.div>
  );
}
