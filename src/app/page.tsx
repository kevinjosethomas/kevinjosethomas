"use client";

import { motion } from "framer-motion";

import Banner from "@/ui/components/Banner";
import Presence from "@/ui/components/Presence";
import Highlight from "@/ui/components/Highlight";
import Timeline from "@/ui/components/Timeline";
import { TIMELINE } from "@/data";

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
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row items-start justify-between">
        <div className="order-2 flex flex-col items-start gap-4 text-base font-light text-white text-opacity-75 md:order-1 md:w-1/2 xl:gap-6 2xl:text-lg">
          <div className="flex flex-col gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="inline"
            >
              I&apos;m a high school senior from
              <Highlight href="https://vancouver.ca/" className="mx-0.5 px-0.5">
                Vancouver
              </Highlight>
              with a passion for computer science and software development.
              I&apos;m currently:
            </motion.div>
            <ul className="flex list-outside list-disc flex-col gap-0.5 pl-4 md:pl-4">
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Working at UToronto&apos;s{" "}
                <Highlight
                  icon="/icons/csslab.png"
                  href="https://maiachess.com/"
                  rotate={1}
                >
                  Computational Social Science Lab
                </Highlight>
                , where I develop the Maia Platform to enhance human-AI
                collaboration in chess
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                Organizing
                <Highlight
                  icon="/icons/scrapyard.svg"
                  href="https://scrapyard.hackclub.com/"
                  className="mx-1 px-0.5"
                  rotate={2}
                >
                  Hack Club Scrapyard,
                </Highlight>
                a global high school hackathon happening in Austin, Texas and
                100+ cities around the world this winter!
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Leading the
                <Highlight
                  icon="/icons/bcydc.svg"
                  href="https://bcydc.ca/"
                  className="mx-1 px-0.5"
                  rotate={1}
                >
                  British Columbia Youth Developer Collective,
                </Highlight>
                a community of over 300 high school developers in British
                Columbia.
              </motion.li>
            </ul>
          </div>
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="inline"
            >
              Prior to this, I:
            </motion.div>
            <ul className="flex list-outside list-disc flex-col gap-0.5 pl-4 md:pl-4">
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                Organized{" "}
                <Highlight
                  rotate={1}
                  icon="/icons/yvrhacks.png"
                  href="https://bcydc.ca/program/yvrhacks"
                >
                  yvrHacks
                </Highlight>
                , British Columbia&apos;s biggest high school hackathon
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
              >
                Worked on neural sign language translation, where I developed an
                open-source ASL fingerspell recognition and pose production
                model
                <ul className="mt-1 flex list-outside list-disc flex-col gap-0.5 pl-8">
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    See my{" "}
                    <Highlight href="https://arxiv.org/abs/2408.09311">
                      arXiv preprint
                    </Highlight>
                    ,{" "}
                    <Highlight href="https://www.youtube.com/watch?v=uuPxMWQRoXc">
                      demo video
                    </Highlight>
                    , and{" "}
                    <Highlight href="https://github.com/kevinjosethomas/sign-language-processing">
                      code
                    </Highlight>
                  </motion.li>
                </ul>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.45 }}
              >
                Attended hackathons in{" "}
                <Highlight
                  icon="/icons/summit.svg"
                  href="https://www.youtube.com/watch?v=UZEm5lONg7g"
                >
                  San Francisco
                </Highlight>
                ,{" "}
                <Highlight
                  icon="/icons/htn.svg"
                  href="https://devpost.com/software/sign-engine"
                >
                  UWaterloo
                </Highlight>
                ,{" "}
                <Highlight href="https://devpost.com/software/nutrition-facts">
                  UBC
                </Highlight>
                , and a{" "}
                <Highlight href="https://youtu.be/hiG3fYq3xUU?t=438">
                  train across Canada
                </Highlight>
                !
              </motion.li>
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <p>
              You can read my thoughts, notes, and blog in my{" "}
              <Highlight href="https://knowledge.kevinjosethomas.com/">
                Knowledgebase
              </Highlight>
              !
            </p>
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
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
          </motion.div> */}
          {/* <Presence /> */}
        </div>
        <Banner src="1" alt="Home" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-24 w-full pt-16"
      >
        <Timeline entries={TIMELINE} />
      </motion.div>
    </div>
  );
}
