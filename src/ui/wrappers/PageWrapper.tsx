import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "ui/components/Navbar/Navbar";

export default function PageWrapper(props: {
  width: string;
  image?: { alt: string; src: string };
  children?: ReactElement | ReactElement[];
}) {
  return (
    <div className="flex w-full max-w-screen-xl items-start justify-between py-24 px-36 2xl:max-w-screen-2xl 3xl:max-w-[1920px] 4xl:py-0">
      <div className={`flex flex-col justify-start gap-4 2xl:gap-8 ${props.width}`}>
        <Navbar />
        {props.children}
      </div>
      <div className="sticky top-24 flex w-1/3 min-w-[30%] max-w-[30%] overflow-visible">
        <AnimatePresence>
          {props.image && (
            <motion.img
              layoutId="image"
              src={props.image.src}
              alt={props.image.alt}
              className="w-full rounded-lg"
              transition={{ duration: 0.6 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
