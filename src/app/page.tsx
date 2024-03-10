"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Presence from "@/ui/components/Presence";

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
    <div className="flex flex-col w-1/2 items-start text-white text-md gap-4 2xl:text-xl 3xl:text-2xl text-opacity-80">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Hey!{" "}
        <Image
          src={"/icons/wave.png"}
          alt="Wave"
          className="mx-1 inline h-6"
          width={24}
          height={24}
          draggable="false"
        />{" "}
        I'm a high school junior from Vancouver with a passion for computer
        science and software development.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Over the last four years, I have built proficiency in Python,
        TypesSript, Java, PostgreSQL and a couple other languages and
        frameworks. I use my full-stack experience to work on developing
        efficient software with modern design and exceptional user experiences.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Now, most of my life is off my computer: exploring yvr, volunteering, or
        playing badminton and grinding for school. I spend most of my time
        trying out new things, making new friends and preparing for
        post-secondary.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        Although most of my time is in school, i still enjoy learning about new
        technology, participating in hackathons and occasionally freelancing or
        working on a few side projects.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex flex-col md:flex-row"
      >
        Reach out:{" "}
        <div className="flex items-center gap-2 md:ml-2">
          {socials.map((s, i) => (
            <div
              key={i}
              className="relative opacity-80 transition duration-300 hover:opacity-100"
            >
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
              <div className="absolute bottom-0.5 h-0.5 w-full bg-white" />
            </div>
          ))}
        </div>
      </motion.div>
      <Presence />
    </div>
  );
}
