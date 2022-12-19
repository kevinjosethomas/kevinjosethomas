import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";

const Item = ({ label, href }: { label: string; href: string }) => {
  return (
    <div className="relative">
      <Link to={href}>
        <p className="font-std text-2xl text-white">{label}</p>
      </Link>
      {useMatch(href) && (
        <motion.div layoutId="underline" className="absolute h-0.5 w-full rounded-full bg-white" />
      )}
    </div>
  );
};

export default Item;
