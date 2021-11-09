import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

export default function DropdownContainer(props) {
  const controls = useAnimation();
  const [dropdown, setDropdown] = useState(false);

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
  }, [dropdown]);

  return (
    <div className="relative flex flex-col items-start justify-start">
      <motion.i
        animate={controls}
        className="fas fa-caret-down text-lg text-white text-opacity-70 cursor-pointer"
        onClick={() => setDropdown((dd) => !dd)}
      />
      <AnimatePresence>{dropdown && <Dropdown setDropdown={setDropdown} />}</AnimatePresence>
    </div>
  );
}

function Dropdown(props) {
  const ref = useDetectClickOutside({ onTriggered: () => props.setDropdown(false) });

  const elements = [
    {
      label: "/setup",
      href: "/setup",
    },
    {
      label: "/recommendations",
      href: "https://github.com/trustedmercury/recommendations",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="absolute top-10 flex flex-col items-start justify-start bg-black border-[1px] border-white border-opacity-60 rounded"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {elements.map((el, index) => (
        <DropdownElement key={index} {...el} />
      ))}
    </motion.div>
  );
}

function DropdownElement(props) {
  const internal = props.href.startsWith("/");

  const Container = (props) =>
    internal ? (
      <Link href={props.href}>{props.children}</Link>
    ) : (
      <Fragment>{props.children}</Fragment>
    );

  return (
    <Container {...props}>
      <a
        href={!internal ? props.href : null}
        target={internal ? "_self" : "_blank"}
        className="flex flex-row items-center justify-start w-full pl-2 pr-8 py-1 hover:bg-white hover:bg-opacity-[0.08] cursor-pointer select-none"
      >
        <span className="text-sm text-white text-opacity-70">{props.label}</span>
      </a>
    </Container>
  );
}
