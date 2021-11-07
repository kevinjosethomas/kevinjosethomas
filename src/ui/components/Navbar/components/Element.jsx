import Link from "next/link";
import { motion } from "framer-motion";

export default function Element(props) {
  return (
    <div className="relative flex flex-col items-start justify-start px-1">
      <Link href={props.href}>
        <a
          className={`text-lg text-white ${
            props.active
              ? "text-opacity-90"
              : "text-opacity-70 hover:text-opacity-90 transition duration-300"
          }`}
        >
          {props.label}
        </a>
      </Link>
      {props.active && (
        <motion.div className="nav-highlight left-0 absolute w-full h-0.5 bg-white bg-opacity-90" />
      )}
    </div>
  );
}
