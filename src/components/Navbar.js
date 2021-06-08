import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

import { MobileNav } from "./MobileNav.js";
import { ExpandNav } from "../util/Animations";

const useNavbarState = () => {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    setIsOpen,
  };
};

export const Navbar = (props) => {
  const router = useRouter();
  const { isOpen, setIsOpen } = useNavbarState();
  const [status, setStatus] = useState();

  useEffect(async () => {
    const lanyard = await axios.get(
      "https://api.lanyard.rest/v1/users/418707912836382721"
    );
    if (lanyard.status === 200 && lanyard.data.success) {
      setStatus(lanyard.data.data);
    }
  }, []);

  let padding;
  if (router.pathname === "/" || router.pathname === "/skills") {
    padding = "md:px-20 xl:px-40 2xl:px-52 md:pt-10 2xl:pt-20";
  } else if (router.pathname === "/projects") {
    padding = "md:px-20 xl:px-16 2xl:px-52 md:pt-10 2xl:pt-20";
  } else {
    padding = "px-40 2xl:px-52 xl:pt-10 2xl:pt-20";
  }

  return (
    <nav className="w-full">
      <motion.div
        initial="initial"
        animate="animate"
        variants={ExpandNav}
        layoutId="navbar"
        className={`hidden md:flex flex-row items-center justify-between w-full ${padding}`}
      >
        <div className="flex flex-row items-center justify-start">
          <Link href="/">
            <a className="mr-4 font-medium text-2xl text-gray-200 hover:text-gray-400 transition duration-300">
              <i className="fal fa-home" />
            </a>
          </Link>
          <Link href="/projects">
            <a className="mx-4 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400 transition duration-300">
              projects
            </a>
          </Link>
          <Link href="/skills">
            <a className="mx-4 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400 transition duration-300">
              skills
            </a>
          </Link>
          <a
            target="_blank"
            href="https://github.com/TrustedMercury/Recommendations"
            className="ml-4 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400 transition duration-300"
          >
            recommendations
          </a>
        </div>
        <div className="flex flex-row items-center justify-end">
          {status && status.listening_to_spotify && (
            <div className="flex flex-row items-center justify-center space-x-4 px-6 py-4 bg-black rounded-xl select-none transform hover:scale-105 duration-300">
              <i className="fab fa-spotify text-4xl text-green-500" />
              <div className="flex flex-col items-start justify-center">
                <p className="font-inter text-xs text-gray-400">Listening to</p>
                <p className="font-inter font-semibold text-xs text-green-500">
                  {status.spotify.song}
                </p>
                <p className="font-inter text-xs text-gray-400">
                  by{" "}
                  <span className="font-inter font-semibold text-xs text-green-500">
                    {status.spotify.artist}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      <div className="flex md:hidden flex-row items-center justify-end p-6 w-full">
        <i
          onClick={() => setIsOpen(true)}
          className="fas fa-bars text-3xl text-gray-200 hover:text-gray-300 cursor-pointer"
        />
      </div>
      <AnimatePresence>
        {isOpen && <MobileNav setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </nav>
  );
};
