import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor(props) {
  return (
    <motion.div
      className="absolute top-0 left-0 flex flex-col items-center justify-center"
      animate={{
        x: props.loc.x + props.loc.width / 2,
        y: props.loc.y + props.loc.height / 2,
      }}
      transition={{ duration: 0.75 }}
    >
      <img src="cursor.png" alt="cursor" className="w-3" />
    </motion.div>
  );
}

export function Cursor2(props) {
  return (
    <motion.div
      className="absolute top-0 left-0 flex flex-col items-center justify-center"
      initial={{
        x: props.loc.x + props.loc.width / 2,
        y: props.loc.y + props.loc.height / 2,
      }}
      animate={{
        x: props.loc2.x + props.loc2.width / 2,
        y: props.loc2.y + props.loc2.height / 2,
      }}
      transition={{ duration: 0.75 }}
    >
      <img src="cursor.png" alt="cursor" className="w-3" />
    </motion.div>
  );
}
