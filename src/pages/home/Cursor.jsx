import { motion } from "framer-motion";

export default function Cursor(props) {
  const loc = document.getElementById("closeButton")?.getBoundingClientRect();

  return (
    <motion.div
      className="absolute top-0 left-0 flex flex-col items-center justify-center"
      animate={{
        x: loc.x + loc.width / 2,
        y: loc.y + loc.height / 2,
      }}
      transition={{ duration: 0.75 }}
    >
      <img src="cursor.png" alt="cursor" className="w-3" />
    </motion.div>
  );
}
