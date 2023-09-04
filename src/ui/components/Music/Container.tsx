import { motion } from "framer-motion";
import ScrollContainer from "react-indiana-drag-scroll";

import Item from "./Item";

export default function Container({ i, type, data }: { i: number; type: string; data: any[] }) {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 1 }}
      transition={{ duration: 0.3, delay: i * 0.2 }}
    >
      <div className="flex w-full items-end justify-between">
        <p className="text-2xl text-white">
          top {type}s <span className="text-base text-white text-opacity-80">(4 weeks)</span>
        </p>
        <a
          target="_blank"
          rel="noreferrer"
          className="text-lg text-white text-opacity-80 transition duration-300 hover:text-opacity-100"
          href="https://stats.fm/kevinthomas"
        >
          see more
        </a>
      </div>
      <ScrollContainer vertical={false} className="flex cursor-grab gap-4 p-2">
        {data.map((x, i) => (
          <Item
            key={i}
            index={i + 1}
            name={x[type].name}
            img={type === "track" ? x[type].albums[0].image : x[type].image}
            mins={Math.round(x.playedMs / 1000 / 60)}
          />
        ))}
      </ScrollContainer>
    </motion.div>
  );
}
