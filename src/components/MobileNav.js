import Link from "next/link";
import { motion } from "framer-motion";

import { MobileNavSlide } from "../util/Animations";

export const MobileNav = (props) => {
  return (
    <motion.div
      className="absolute flex md:hidden flex-col items-center justify-start py-4 px-6 inset-0 h-screen w-screen z-50 overflow-hidden bg-dark-200"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={MobileNavSlide}
    >
      <i
        onClick={() => props.setIsOpen(false)}
        className="fas fa-times self-end mb-20 text-2xl text-gray-400 hover:text-gray-500 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center mt-20">
        <Link href="/">
          <a className=" mb-2font-medium text-2xl text-gray-200 hover:text-gray-400">
            <i className="fal fa-home" />
          </a>
        </Link>
        <Link href="/skills">
          <a className="my-2 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400">
            skills
          </a>
        </Link>
        <Link href="/projects">
          <a className="my-2 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400">
            projects
          </a>
        </Link>
        <a
          target="_blank"
          href="https://github.com/TrustedMercury/Recommendations"
          className="my-2 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400"
        >
          recommendations
        </a>
      </div>
    </motion.div>
  );
};
