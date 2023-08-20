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
      <AnimatePresence>
        {props.image && (
          <motion.img
            alt={props.image.alt}
            className="w-1/3 rounded-lg"
            layoutId="image"
            src={props.image.src}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
