import { motion } from "framer-motion";

export default function Book(props) {
  return (
    <motion.a
      href={props.link}
      target="_blank"
      rel="noreferrer nofollow"
      className="group relative flex flex-row items-center justify-start w-full px-5 h-[8rem] overflow-hidden rounded-lg"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 * props.index }}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-80 group-hover:bg-opacity-70 transition duration-300" />
        <img
          src={props.img}
          alt={props.name}
          draggable="false"
          className="absolute top-0 left-0 min-w-full h-full select-none"
        />
      </div>
      <div className="z-10 flex flex-col items-start justify-start opacity">
        <div className="flex flex-row items-center justify-start space-x-2">
          {/* {props.favourite && (
            <i className="far fa-sparkles text-2xl text-blue-400 text-opacity-80" />
          )} */}
          <p className="font-bold text-3xl text-white text-opacity-80 select-none">{props.name}</p>
        </div>

        <p className="text-white text-opacity-70 select-none">Read {props.read_at}</p>
      </div>
    </motion.a>
  );
}
