import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import Caret from "assets/img/icon/caret.svg";

export default function Container() {
  const controls = useAnimation();
  const [dropdown, showDropdown] = useState(false);
  const ref = useDetectClickOutside({ onTriggered: () => showDropdown(false) });

  useEffect(() => {
    if (!dropdown) {
      controls.start({
        rotate: 0,
      });
    } else {
      controls.start({
        rotate: 180,
      });
    }
  }, [dropdown, controls]);

  return (
    <div className="relative flex flex-col" ref={ref}>
      <motion.img
        src={Caret}
        alt="dropdown"
        animate={controls}
        className="h-6 cursor-pointer select-none"
        onClick={() => showDropdown((x) => !x)}
      />
      <AnimatePresence>{dropdown && <Dropdown />}</AnimatePresence>
    </div>
  );
}

function Dropdown() {
  const dropdownItems = [
    { label: "music", href: "/music" },
    { label: "recommendations", href: "" },
  ];

  return (
    <motion.div
      className="absolute top-10 -left-4 z-10 flex flex-col rounded-md border bg-black py-2"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {dropdownItems.map((x, i) => (
        <Link
          key={i}
          to={x.href}
          className="flex py-0.5 pl-4 pr-8 transition duration-300 hover:bg-white hover:bg-opacity-10"
        >
          <p className="text-lg text-white">{x.label}</p>
        </Link>
      ))}
    </motion.div>
  );
}
