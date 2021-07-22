import { motion } from "framer-motion";

import { Default } from "../layouts/default.js";
import {
  HomeSocialsSlideUp,
  HomeTitleSlideUp,
  HomePronounceSlideUp,
  HomeDefinitionSlideUp,
  HomeInsultSlideUp,
} from "../util/Animations";

const Index = (props) => {
  return (
    <Default>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        layoutId="index"
        className="flex flex-col items-start justify-center my-24 md:my-32 2xl:my-52 px-6 md:px-0 md:pl-20 xl:pl-40 2xl:pl-52"
      >
        <div className="flex flex-col items-start justify-center mb-5">
          <motion.div
            className="flex flex-row items-center justify-start mb-2 md:mb-0"
            initial="initial"
            animate="animate"
            variants={HomeSocialsSlideUp}
          >
            <a
              target="_blank"
              href="https://github.kevinthomas.codes/"
              className="mr-2 font-inter font-medium text-3xl md:text-lg text-gray-300 hover:text-purple-400 transition duration-500"
            >
              <i className="fab fa-github" />{" "}
              <span className="hidden md:inline">trustedmercury</span>
            </a>
            <a
              target="_blank"
              href="https://twitter.kevinthomas.codes/"
              className="ml-2 font-inter font-medium text-3xl md:text-lg text-gray-300 hover:text-purple-400 transition duration-500"
            >
              <i className="fab fa-twitter" />{" "}
              <span className="hidden md:inline">trustedmercury</span>
            </a>
          </motion.div>
          <motion.span
            initial="initial"
            animate="animate"
            variants={HomeTitleSlideUp}
            className="font-inter font-bold text-6xl md:text-7xl xl:text-8xl text-gradient bg-gradient-to-r from-purple-500 to-purple-400"
          >
            Kev·in Thom·as
          </motion.span>
          <motion.span
            initial="initial"
            animate="animate"
            variants={HomePronounceSlideUp}
            className="font-inter text-2xl text-gray-400"
          >
            /ˈkevɪn tɒməs/
          </motion.span>
        </div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={HomeDefinitionSlideUp}
          className="flex flex-col items-start justify-center mt-5"
        >
          <span className="font-inter italic text-xl text-gray-300">
            proper noun
          </span>
          <div className="flex flex-col items-start justify-center ml-6">
            <span className="font-inter md:text-xl xl:text-3xl text-gray-400">
              14 y/o aspiring tech entrepreneur, developer and student
            </span>
            <span className="font-inter font-medium italic text-sm xl:text-xl text-gray-500">
              “Interested in software engineering internships and
              participating in developer events!”
            </span>
          </div>
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={HomeInsultSlideUp}
          className="hidden md:inline xl:hidden mt-20"
        >
          <span className="font-inter font-semibold text-lg text-gray-200">
            what are you on? an iPad? bleh - get on a real device
          </span>
        </motion.div>
      </motion.div>
    </Default>
  );
};

export default Index;
