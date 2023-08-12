import { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "ui/components/Navbar/Navbar";

const PageWrapper = (props: {
  name?: boolean;
  image?: { alt: string; src: string; style: string };
  children?: ReactElement | ReactElement[];
}) => {
  return (
    <div className="flex w-full items-start justify-between py-24 px-36">
      <div className={`flex flex-col justify-start gap-8 ${props.image && "w-1/2"}`}>
        <Navbar name={props.name} />
        {props.children}
      </div>
      <AnimatePresence>
        {props.image && (
          <motion.img
            alt={props.image.alt}
            className={`${props.image.style} rounded-lg`}
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
};

export default PageWrapper;
