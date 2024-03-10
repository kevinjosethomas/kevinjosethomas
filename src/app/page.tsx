"use client";

import { motion } from "framer-motion";

import Presence from "@/ui/components/Presence";
import Highlight from "@/ui/components/Highlight";

export default function Home() {
  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/kevinjosethomas",
    },
    {
      label: "Linkedin",
      href: "https://linkedin.com/in/kevinjosethomas",
    },
  ];

  return (
    <div className="flex flex-col w-1/2 items-start text-white text-md gap-4 2xl:text-xl font-light text-opacity-75">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="inline"
      >
        I'm a high school junior from <Highlight>Vancouver</Highlight> with a
        passion for computer science and software development.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Over the last four years, I have built proficiency in{" "}
        <Highlight>Python</Highlight>, <Highlight>TypeScript</Highlight>,{" "}
        <Highlight>React</Highlight> and <Highlight>PostgreSQL</Highlight>. I
        use my full-stack experience to work on developing efficient software
        with modern design and exceptional user experiences.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        Although most of my time is in school, I enjoy learning about new
        technology, participating in hackathons and occasionally freelancing or
        working on side projects. I'm currently working on{" "}
        <Highlight href="https://bcydc.ca/">BCYDC</Highlight>, a community for
        high school developers in British Columbia.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex flex-col md:flex-row"
      >
        I'm looking for new opportunities.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="flex flex-col md:flex-row"
      >
        Reach out:{" "}
        <div className="flex items-center gap-2 md:ml-2">
          {socials.map((s, i) => (
            <a href={s.href} target="_blank" rel="noreferrer">
              <Highlight>{s.label}</Highlight>
            </a>
          ))}
        </div>
      </motion.div>
      <Presence />
    </div>
  );
}
