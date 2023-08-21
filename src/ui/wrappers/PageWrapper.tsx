import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "ui/components/Navbar/Navbar";

export default function PageWrapper(props: {
  width: string;
  image?: { alt: string; src: string };
  children?: ReactElement | ReactElement[];
}) {
  return (
    <div className="flex w-full max-w-[1920px] items-start justify-between py-24 px-36">
      <div className={`flex flex-col justify-start gap-4 2xl:gap-8 ${props.width}`}>
        <Navbar />
        {props.children}
      </div>
      <div className="sticky top-10 flex w-1/3 overflow-visible">
        <AnimatePresence>
          {props.image && (
            <motion.img
              alt={props.image.alt}
              className="w-full rounded-lg"
              layoutId="image"
              src={props.image.src}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
