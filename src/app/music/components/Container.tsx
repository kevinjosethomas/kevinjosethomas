"use client";

import { motion } from "framer-motion";

export default function Container({
  order,
  type,
  data,
}: {
  order: number;
  type: string;
  data: any[];
}) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 1 }}
      transition={{ duration: 0.3, delay: order * 0.2 }}
      className="no-scrollbar flex w-full flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-2">
          <span className="text-2xl font-medium capitalize text-white">
            Top {type}s
          </span>
          <span className="text-base text-white text-opacity-80">
            (4 weeks)
          </span>
        </div>
        <a
          target="_blank"
          href="https://stats.fm/kevinthomas"
          className="text-lg text-white"
        >
          See more
        </a>
      </div>
      <div className="flex w-full cursor-grab gap-4 overflow-scroll">
        {data.map((item, index) => (
          <div
            key={index}
            className="group relative flex h-32 min-h-32 w-32 min-w-32 select-none items-end overflow-hidden p-2 duration-300 hover:scale-105"
          >
            <div className="z-20 flex w-full flex-col transition duration-500 group-hover:opacity-0">
              <p className="w-full truncate whitespace-nowrap text-sm font-medium text-white text-opacity-80 3xl:text-lg">
                {index + 1}. {item[type].name}
              </p>
              <p className="text-xs text-white text-opacity-60 3xl:text-sm">
                {Math.round(item.playedMs / 1000 / 60)} minutes
              </p>
            </div>
            <div className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-80 transition duration-300 group-hover:bg-opacity-0" />
            <img
              src={
                type == "track" ? item[type].albums[0].image : item[type].image
              }
              alt={item.name}
              className="absolute left-0 top-0 w-full"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
