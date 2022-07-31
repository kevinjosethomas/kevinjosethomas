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
      <div
        className={`flex h-[28px] w-[28px] items-center justify-center rounded-full ${
          dropdown
            ? "bg-white bg-opacity-10"
            : "transition duration-300 hover:bg-white hover:bg-opacity-10"
        } `}
      >
        <motion.i
          animate={controls}
          className="fas fa-caret-down text-lg text-white text-opacity-70"
          onClick={() => setDropdown((dd) => !dd)}
        />
      </div>

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
      label: "/books",
      href: "/books",
    },
    {
      label: "/recommendations",
      href: "https://github.com/kevinjosethomas/recommendations",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="absolute top-10 flex flex-col items-start justify-start rounded border-[1px] border-white border-opacity-60 bg-black"
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
        className="flex w-full cursor-pointer select-none flex-row items-center justify-start py-1 pl-2 pr-8 hover:bg-white hover:bg-opacity-[0.08]"
      >
        <span className="text-sm text-white text-opacity-70">{props.label}</span>
      </a>
    </Container>
  );
}
