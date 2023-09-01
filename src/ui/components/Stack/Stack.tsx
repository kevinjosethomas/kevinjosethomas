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
      name: "python",
      description: "my go-to language for scripts, Discord bots, scrapers & libraries",
    },
    {
      icon: TypeScript,
      color: "bg-[#3178C6]",
      name: "typescript",
      description: "type my frontend applications (next/react) & APIs (express/fastify)",
    },
    {
      icon: PostgreSQL,
      color: "bg-[#4169E1]",
      name: "postgresql",
      description: "my go-to SQL database software, with asyncpg (python) & pg (node)",
    },
    {
      icon: React,
      color: "bg-[#087ea4]",
      name: "react",
      description: "my go-to frontend framework, used for all my web applications so far",
    },
  ];

  return (
    <div className="col-span-3 grid w-full grid-cols-1 gap-4">
      {stack.map((s, i) => (
        <motion.div
          key={i}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * i }}
          className="flex overflow-hidden rounded-xl border border-white border-opacity-20"
        >
          <div className={`flex h-40 w-40 select-none items-center justify-center ${s.color}`}>
            <img src={s.icon} alt={s.name} draggable="false" className="h-16 w-16" />
          </div>
          <div className="flex flex-col justify-center px-4">
            <p className="text-2xl font-medium text-white">{s.name}</p>
            <p className="max-w-sm text-lg text-white">{s.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
