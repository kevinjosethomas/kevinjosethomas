import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence} from "framer-motion";

import { MobileNav } from "./MobileNav.js";

const useNavbarState = () => {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    setIsOpen
  }
}

export const Navbar = (props) => {

  const router = useRouter()
  const { isOpen, setIsOpen } = useNavbarState();

  let padding;
  if (router.pathname === "/" || router.pathname === "/skills") {
    padding = "md:pl-20 xl:pl-40 2xl:pl-52 md:pt-10 2xl:pt-20"
  } else if (router.pathname === "/projects") {
    padding = "md:pl-20 xl:px-16 2xl:px-52 md:pt-10 2xl:pt-20"
  } else {
    padding = "pl-40 2xl:pl-52 xl:pt-10 2xl:pt-20"
  }

  return (
    <nav className="w-full">
      <div className={`hidden md:flex flex-row items-center justify-start w-full ${padding}`}>
        <Link href="/">
          <a className="mr-4 font-medium text-2xl text-gray-200 hover:text-gray-400"><i className="fal fa-home" /></a>
        </Link>
        <Link href="/projects">
          <a className="mx-4 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400">projects</a>
        </Link>
        <Link href="/skills">
          <a className="mx-4 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400">skills</a>
        </Link>
        <a
          target="_blank"
          href="https://blog.kevinthomas.codes/"
          className="mx-4 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400"
        >blog</a>
        <a
          target="_blank"
          href="https://github.com/TrustedMercury/Recommendations"
          className="ml-4 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400"
        >recommendations</a>

      </div>
      <div className="flex md:hidden flex-row items-center justify-end p-6 w-full">
        <i onClick={() => setIsOpen(true)} className="fas fa-bars text-3xl text-gray-200 hover:text-gray-300 cursor-pointer" />
      </div>
      <AnimatePresence>
        { isOpen && (
          <MobileNav
            setIsOpen={setIsOpen}
          />
        ) }
      </AnimatePresence>
    </nav>
  )

}
