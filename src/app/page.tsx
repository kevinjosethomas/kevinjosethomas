"use client";

import { motion } from "framer-motion";

import Banner from "@/ui/components/Banner";
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
    {
      label: "Email",
      href: "mailto:kevin.jt2007@gmail.com",
    },
  ];

  return (
    <div className="flex w-full flex-row items-start justify-between">
      <div className="order-2 flex flex-col items-start gap-2 text-base font-light text-white text-opacity-75 md:order-1 md:w-1/2 xl:gap-4 2xl:text-lg">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline"
        >
          I&apos;m a high school senior from <Highlight>Vancouver</Highlight>{" "}
          with a passion for computer science and software development.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Over the last five years, I have built proficiency in{" "}
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
          Right now, I&apos;m:
          <ul className="flex list-outside list-disc flex-col gap-0.5 pl-4 md:pl-0">
            <li>
              Working at the{" "}
              <Highlight
                icon="/icons/csslab.png"
                href="https://maiachess.com/"
                rotate={1}
              >
                Computational Social Science Lab
              </Highlight>
              within the University of Toronto, where I help develop algorithmic
              teaching tools to enhance human-AI collaboration in chess
            </li>
            <li>
              Organizing{" "}
              <Highlight
                icon="/icons/scrapyard.svg"
                href="https://scrapyard.hackclub.com/"
                rotate={2}
              >
                Hack Club Scrapyard,
              </Highlight>
              a global high school hackathon happening in Los Angeles and 100+
              cities around the world this winter!
            </li>
            <li>
              Leading the{" "}
              <Highlight
                icon="/icons/bcydc.svg"
                href="https://bcydc.ca/"
                rotate={1}
              >
                British Columbia Youth Developer Collective,
              </Highlight>
              a community of over 300 high school developers in British
              Columbia.
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <p>
            You can read my thoughts, learnings and blog{" "}
            <Highlight href="https://knowledge.kevinjosethomas.com/">
              here
            </Highlight>
          </p>
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
