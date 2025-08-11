"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

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
        src="/icons/caret.svg"
        alt="dropdown"
        animate={controls}
        className="h-4 cursor-pointer select-none 2xl:h-6"
        onClick={() => showDropdown((x) => !x)}
      />
      <AnimatePresence>
        {dropdown && <Dropdown showDropdown={showDropdown} />}
      </AnimatePresence>
    </div>
  );
}

function Dropdown(props: { showDropdown: (x: boolean) => void }) {
  const dropdownItems = [
    { label: "my work", href: "/work" },
    { label: "my stack", href: "/stack" },
    { label: "my papers", href: "/papers" },
    { label: "now playing", href: "/music" },
    {
      label: "knowledgebase",
      href: "https://knowledge.kevinjosethomas.com/",
    },
  ];
  const socials = [
    {
      label: "github",
      icon: "/icons/github.svg",
      href: "https://github.com/kevinjosethomas",
    },
    {
      label: "x",
      icon: "/icons/x.svg",
      href: "https://x.com/kevinjosethomas",
    },
    {
      label: "linkedin",
      icon: "/icons/linkedin.svg",
      href: "https://linkedin.com/in/kevinjosethomas",
    },
  ];

  return (
    <motion.div
      className="absolute right-0 top-6 z-50 flex flex-col rounded-md border border-white border-opacity-20 bg-black py-2 md:-left-4 md:right-auto 2xl:top-8"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => props.showDropdown(false)}
    >
      <div className="flex flex-col">
        {dropdownItems.map((x, i) => (
          <Item key={i} {...x} />
        ))}
      </div>
      <div className="mx-4 mb-2 mt-1 h-[1px] rounded bg-white/30" />
      <div className="flex flex-row items-center justify-center gap-4 px-4 py-3">
        {socials.map((x, i) => (
          <a
            href={x.href}
            key={i}
            target="_blank"
            rel="noreferrer"
            className="group"
          >
            <img
              src={x.icon}
              alt={x.label}
              className="h-5 w-5 opacity-60 transition-all duration-300 group-hover:opacity-100"
            />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function Item({ label, href }: { label: string; href: string }) {
  const internal = href.startsWith("/");
  const style =
    "flex py-0.5 pl-4 pr-8 transition duration-300 hover:bg-white hover:bg-opacity-10";

  const LinkContainer = ({ children }: { children: React.ReactElement }) =>
    internal ? (
      <Link href={href} className={style}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noreferrer" className={style}>
        {children}
      </a>
    );

  return (
    <LinkContainer>
      <p className="text-lg text-white">{label}</p>
    </LinkContainer>
  );
}
