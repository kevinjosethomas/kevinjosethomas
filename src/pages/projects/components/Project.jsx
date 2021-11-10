import { motion } from "framer-motion";

export default function Project(props) {
  return (
    <motion.a
      target="_blank"
      href={props.href}
      className="flex flex-col md:flex-row items-center justify-start w-full hover:bg-white hover:bg-opacity-5 border-[1px] border-white border-opacity-10 rounded transition duration-300"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 * props.index }}
    >
      <div className="flex flex-col items-start justify-center md:h-28 w-full md:w-auto md:min-w-[232px] p-5 border-[1px] border-white border-opacity-10">
        <div className="flex flex-row items-center justify-center space-x-2">
          <div
            className={`w-2 h-2 ${
              props.status === 1
                ? "bg-green-500"
                : props.status === 0
                ? "bg-yellow-500"
                : "bg-red-500"
            } rounded-full`}
          />
          <p className="terminal text-xl text-white text-opacity-90 leading-snug">{props.title}</p>
        </div>
        <p className="text-lg text-white text-opacity-80 leading-snug">{props.subtitle}</p>
        <p className="text-sm text-white text-opacity-80 leading-snug">{props.date}</p>
      </div>
      <div className="flex flex-col items-start justify-center md:h-28 w-full p-5 border-[1px] border-white border-opacity-5">
        <p className="text-lg text-white text-opacity-80 leading-snug">{props.description}</p>
      </div>
    </motion.a>
  );
}
