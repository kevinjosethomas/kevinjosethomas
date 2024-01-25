import { motion } from "framer-motion";

import React from "assets/img/icon/react.svg";
import Python from "assets/img/icon/python.svg";
import TypeScript from "assets/img/icon/typescript.svg";
import PostgreSQL from "assets/img/icon/postgresql.svg";

export default function Stack() {
  const stack = [
    {
      icon: Python,
      color: "bg-[#DFBA39]",
      name: "Python",
      description: "For quick scripts, discord bots, scrapers and libraries",
    },
    {
      icon: TypeScript,
      color: "bg-[#3178C6]",
      name: "TypeScript",
      description:
        "For all frontend applications (next/react) and APIs (fastify)",
    },
    {
      icon: PostgreSQL,
      color: "bg-[#4169E1]",
      name: "PostgreSQL",
      description: "My go-to SQL database software, with asyncpg & pg",
    },
    {
      icon: React,
      color: "bg-[#087ea4]",
      name: "React",
      description: "My go-to frontend framework, usually with NextJS",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:col-span-3">
      {stack.map((s, i) => (
        <motion.div
          key={i}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * i }}
          className="flex overflow-hidden rounded-xl border border-white border-opacity-20"
        >
          <div
            className={`flex min-h-[100px] min-w-[100px] select-none items-center justify-center 2xl:min-h-[118px] 2xl:min-w-[118px] 3xl:h-40 3xl:w-40 ${s.color}`}
          >
            <img
              src={s.icon}
              alt={s.name}
              draggable="false"
              className="h-8 w-8 2xl:h-10 2xl:w-10 3xl:h-16 3xl:w-16"
            />
          </div>
          <div className="flex flex-col justify-center px-4">
            <p className="font-medium text-white 2xl:text-xl 3xl:text-2xl">
              {s.name}
            </p>
            <p className="max-w-sm text-sm leading-snug text-white text-opacity-80 2xl:text-base 3xl:text-lg">
              {s.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
