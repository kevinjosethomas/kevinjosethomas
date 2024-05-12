"use client";

import { motion } from "framer-motion";

import Presence from "@/ui/components/Presence";
import Highlight from "@/ui/components/Highlight";
import Banner from "@/ui/components/Banner";

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
    {
      label: "Email",
      href: "mailto:kevin.jt2007@gmail.com",
    },
  ];

  return (
    <div className="flex w-full flex-row items-start justify-between">
      <div className="order-2 flex flex-col items-start gap-2 text-base font-light text-white text-opacity-75 md:order-1 md:w-1/2 xl:gap-4 2xl:text-xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline"
        >
          I&apos;m a high school junior from <Highlight>Vancouver</Highlight>{" "}
          with a passion for computer science and software development.
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
          technology, participating in hackathons and occasionally freelancing
          or working on side projects. I&apos;m currently working on{" "}
          <Highlight href="https://bcydc.ca/">BCYDC</Highlight>, a community for
          high school developers in British Columbia.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex flex-col md:flex-row"
        >
          Lets talk —{" "}
          <div className="flex items-center gap-2 md:ml-1">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer">
                <Highlight>{s.label}</Highlight>
              </a>
            ))}
          </div>
        </motion.div>
        <Presence />
      </div>
      <Banner src="1" alt="Home" />
    </div>
  );
}
