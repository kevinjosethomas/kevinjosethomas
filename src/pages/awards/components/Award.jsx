import { motion } from "framer-motion";

export default function Award(props) {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-start w-full hover:bg-white hover:bg-opacity-5 border-[1px] border-white border-opacity-10 rounded transition duration-300"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 * props.index }}
    >
      <div className="flex flex-col items-start justify-center md:h-28 w-full md:w-auto md:min-w-[200px] p-4 md:p-5 border-[1px] border-white border-opacity-10">
        <p className="terminal text-lg md:text-xl text-white text-opacity-90 leading-snug">info</p>
        <p className="md:text-lg text-white text-opacity-80 leading-snug">
          {props.title}
          <br />
          {props.subtitle}
        </p>
      </div>
      <div className="flex flex-col items-start justify-center md:h-28 w-full p-4 md:p-5 border-[1px] border-white border-opacity-5">
        {props.lines.map((line, index) => (
          <p key={index} className="md:text-lg text-white text-opacity-80 leading-snug">
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
