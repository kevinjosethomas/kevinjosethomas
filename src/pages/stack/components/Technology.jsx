import { motion } from "framer-motion";

export default function Technology(props) {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-start w-full md:max-h-[8rem] rounded-xl overflow-hidden hover:bg-white hover:bg-opacity-[0.03] border-[1px] border-white border-opacity-5 transition duration-300"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 * props.index }}
    >
      <div className="flex flex-row items-center justify-start w-full md:w-auto">
        <div
          className={`flex flex-col items-center justify-center min-w-[8rem] min-h-[8rem] ${props.color} text-white`}
        >
          <img src={`/tech/${props.icon}`} draggable="false" className="w-12" />
        </div>
        <div className="flex flex-col items-start justify-center h-32 w-full md:w-[150px] p-5 border-[1px] border-white border-opacity-5">
          <span className="terminal text-xl text-white text-opacity-90 leading-snug">name</span>
          <span className="text-lg text-white text-opacity-80 leading-snug">{props.name}</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-start w-full mmd:in-h-[8rem]">
        <div className="flex flex-col items-start justify-center md:h-32 w-full p-5 border-[1px] border-white border-opacity-5">
          <span className="terminal text-xl text-white text-opacity-90 leading-snug">use case</span>
          <span className="text-lg text-white text-opacity-80 leading-snug">{props.for}</span>
        </div>
      </div>
    </motion.div>
  );
}
