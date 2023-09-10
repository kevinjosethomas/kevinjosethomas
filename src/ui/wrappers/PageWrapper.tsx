import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "ui/components/Navbar/Navbar";

export default function PageWrapper(props: {
  width: string;
  image?: { alt: string; src: string };
  children?: ReactElement | ReactElement[];
}) {
  return (
    <div className="flex w-full max-w-[100vw] flex-col items-start justify-between gap-6 p-6 md:max-w-screen-xl md:flex-row md:gap-0 md:py-24 md:px-36 2xl:max-w-screen-2xl 3xl:max-w-[1920px] 4xl:py-0">
      <div
        className={`order-2 flex w-full flex-col justify-start gap-4 md:order-1 2xl:gap-8 ${props.width}`}
      >
        <Navbar />
        {props.children}
      </div>
      <div className="order-1 flex h-[125px] overflow-visible md:sticky md:top-24 md:order-2 md:h-auto md:w-1/3 md:min-w-[30%] md:max-w-[30%]">
        <AnimatePresence>
          {props.image && (
            <motion.img
              layoutId="image"
              src={props.image.src}
              alt={props.image.alt}
              className="w-full rounded-lg object-cover"
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
