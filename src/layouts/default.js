import { Fragment } from "react";
import { motion } from "framer-motion";

import { PageFade } from "../util/Animations";
import { Navbar } from "../components/Navbar";

export const Default = (props) => {

  return (
    <Fragment>
      <Navbar />
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={PageFade}
        className="flex flex-col items-start justify-center w-full h-full overflow-x-hidden"
      >
        { props.children }
      </motion.div>
    </Fragment>
  )

}
