"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Item({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  return (
    <div className="relative">
      <Link href={href}>
        <p className="text-lg text-white 2xl:text-2xl">{label}</p>
      </Link>
      {pathname == href && (
        <motion.div
          layoutId="underline"
          className="absolute h-0.5 w-full rounded-full bg-white"
        />
      )}
    </div>
  );
}
