import { Screen } from "types";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

export default function Toggle({
  screens,
  screen,
  setScreen,
}: {
  screens: Screen[];
  screen: Screen;
  setScreen: Dispatch<SetStateAction<Screen>>;
}) {
  return (
    <div className="flex flex-row items-center rounded-full border-2 border-white border-opacity-10">
      {screens.map((s, i) => (
        <div
          key={i}
          className="relative flex cursor-pointer px-5 py-1"
          onClick={() => setScreen(s)}
        >
          {screen.label === s.label && (
            <motion.div
              layoutId="highlight"
              className="absolute top-0 left-0 z-0 h-full w-full rounded-full bg-white bg-opacity-[0.15]"
            />
          )}
          <p className="z-10 select-none text-sm text-white md:text-base 2xl:text-lg">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
