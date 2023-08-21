import Item from "./Item";
import { motion } from "framer-motion";

export default function Navbar() {
  const items = [
    {
      label: "who am i",
      href: "/",
    },
    {
      label: "my work",
      href: "/work",
    },
    {
      label: "my stack",
      href: "/stack",
    },
  ];

  return (
    <motion.div layoutId="navbar" className="flex w-full flex-col gap-2 2xl:gap-4">
      <h1 className="font-std text-5xl font-bold text-white 2xl:text-7xl">kevin thomas</h1>
      <div className="flex items-center gap-6">
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </div>
    </motion.div>
  );
}
