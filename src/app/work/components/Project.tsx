"use client";

import { motion } from "framer-motion";

import { Project as ProjectType } from "../../../types";

export default function Project(props: ProjectType) {
  let Container;
  if (props.href) {
    Container = function Container({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <motion.a
          target="_blank"
          href={props.href}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * (props.order || 0.1) }}
          className="flex w-full flex-col overflow-hidden rounded-lg border border-white border-opacity-20 transition duration-300 hover:bg-white hover:bg-opacity-5"
        >
          {children}
        </motion.a>
      );
    };
  } else {
    Container = function Container({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * (props.order || 0.1) }}
          className="flex w-full flex-col overflow-hidden rounded-lg border border-white border-opacity-20 transition duration-300 hover:bg-white hover:bg-opacity-5"
        >
          {children}
        </motion.div>
      );
    };
  }

  return (
    <Container>
      <div className="flex w-full flex-row items-start gap-4 p-4">
        <img
          src={`/images/projects/${props.slug}.png`}
          className="h-16 w-16 rounded"
          alt={props.name}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-white xl:text-lg">{props.name}</h3>
            <div
              className={`h-2 w-2 rounded-full ${
                props.status == "online"
                  ? "bg-green-600"
                  : props.status == "idle"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            />
          </div>
          <p className="text-xs font-light text-white text-opacity-80 xl:text-sm">
            {props.description}
          </p>
        </div>
      </div>
      <div className="no-scrollbar flex w-full items-center gap-2 overflow-scroll px-4 pb-4">
        {props.stat.map((tag, i) => (
          <Tag key={i} {...tag} highlight />
        ))}
        {props.tags.map((tag, i) => (
          <Tag key={i} {...tag} />
        ))}
      </div>
    </Container>
  );
}

function Tag({
  label,
  color,
  highlight,
}: {
  label: string;
  color: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        borderColor: color,
        filter: "contrast(0.3)",
      }}
      className={`flex items-center gap-2 whitespace-nowrap rounded bg-white bg-opacity-10 px-3 py-1 ${
        highlight && "border border-opacity-20"
      }`}
    >
      {!highlight && (
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}

      <p className="text-xs font-light text-white xl:text-sm">{label}</p>
    </div>
  );
}
