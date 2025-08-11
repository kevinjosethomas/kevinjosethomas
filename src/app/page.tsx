"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import Banner from "@/ui/components/Banner";
import Highlight from "@/ui/components/Highlight";
import Timeline from "@/ui/components/Timeline";
import Tooltip from "@/ui/components/Tooltip";
import { TIMELINE } from "@/data";

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const featuredArticles = [
    {
      title: "Another Week at K-Scale Labs",
      href: "https://knowledge.kevinjosethomas.com/Thoughts/Another-Week-at-K-Scale-Labs",
    },
    {
      title:
        "Reflecting on Scrapyard — What We Did in Austin TX and 60+ Cities around the World",
      href: "https://knowledge.kevinjosethomas.com/Thoughts/Reflecting-on-Scrapyard-%E2%80%94-What-We-Did-in-Austin-TX-and-60+-Cities-around-the-World",
    },
    {
      title: "Stanford CS229 Lecture 1",
      href: "https://knowledge.kevinjosethomas.com/Learning/Stanford-CS229/CS229-Lecture-1",
    },
  ];

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const socials = [
  //   {
  //     label: "GitHub",
  //     href: "https://github.com/kevinjosethomas",
  //   },
  //   {
  //     label: "Linkedin",
  //     href: "https://linkedin.com/in/kevinjosethomas",
  //   },
  //   {
  //     label: "Email",
  //     href: "mailto:kevin.jt2007@gmail.com",
  //   },
  // ];

  return (
    <div className="flex w-full flex-col">
      <div className="flex min-h-[80vh] w-full flex-row items-start justify-between">
        <div className="order-2 flex flex-col items-start gap-4 text-lg font-light text-white text-opacity-75 md:order-1 md:w-1/2 xl:gap-8 xl:text-lg">
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              I&apos;m an incoming Computer Science student at the University of
              Waterloo. Currently, I lead engineering for the{" "}
              <Highlight
                rotate={1}
                icon="/icons/maia.png"
                href="https://maiachess.com/"
                className="px-0.5"
              >
                Maia Chess
              </Highlight>
              project{" "}
              <Tooltip
                number={1}
                content="Maia is an open research project on human–AI collaboration in chess, modeling individual playing styles and exploring AI-powered personalized education. As the most-played bot on Lichess (5M+ games), Maia uses chess as a testbed for broader ML research."
              />{" "}
              , where I get to work with{" "}
              <Highlight href="https://www.cs.toronto.edu/~ashton/">
                Dr. Ashton Anderson
              </Highlight>{" "}
              at UofT&apos;s Computational Social Science Lab.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Previously, I was a contract SWE intern at{" "}
              <Highlight
                icon="/icons/kscale.svg"
                href="https://kscale.dev/"
                rotate={2}
              >
                K-Scale Labs (YC24)
              </Highlight>
              <Tooltip
                number={2}
                content="K-Scale Labs is developing America’s first open-source, general-purpose humanoid robot. We are building a complete in-house stack spanning hardware, software, RL, and sim to enable a fully capable general-purpose humanoid."
              />
              , and worked on{" "}
              <Highlight href="https://arxiv.org/abs/2408.09311">
                neural sign language translation
              </Highlight>
              <Tooltip
                number={3}
                content="With my high school also being BC’s only school for the Deaf, I was inspired to build a CV model to recognize ASL fingerspelling from live video and generate sign language poses for real-time translation between students. ASL translation remains an unsolved problem and should be developed in close collaboration with the Deaf community."
              />
              , developing an open-source ASL fingerspelling and pose-generation
              model.{" "}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              I also organized{" "}
              <Highlight
                icon="/icons/scrapyard.svg"
                href="https://scrapyard.hackclub.com/"
                className="px-0.5"
                rotate={2}
              >
                Hack Club Scrapyard
              </Highlight>
              , a global high school hackathon in Austin TX and 60+ cities
              around the world (C$200,000 in funding), and founded{" "}
              <Highlight
                icon="/icons/bcydc.svg"
                href="https://bcydc.ca/"
                className="px-0.5"
                rotate={1}
              >
                BCYDC
              </Highlight>
              , a community of over 350 high school developers across BC.
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex w-full select-none items-center justify-center py-2"
          >
            <div className="flex items-center gap-3 text-sm text-white text-opacity-20">
              <span>—</span>
              <span>×</span>
              <span>—</span>
            </div>
          </motion.div>

          <div className="flex w-full flex-col gap-1">
            <motion.div
              className="text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <p>
                I try to blog my thoughts, and notes from things I learn, in my{" "}
                <Highlight href="https://knowledge.kevinjosethomas.com/">
                  Knowledgebase
                </Highlight>
                . Here are three new articles:
              </p>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="flex list-outside list-disc flex-col -space-y-1 pl-6"
            >
              {featuredArticles.map((article, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.65 + i * 0.05 }}
                >
                  <Highlight href={article.href} className="text-sm">
                    {article.title}
                  </Highlight>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
        <Banner src="1" alt="Home" />
      </div>
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 z-10 -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToTimeline}
              className="flex items-center gap-2 rounded-full border border-white border-opacity-20 bg-black bg-opacity-70 px-5 py-2 text-sm text-white backdrop-blur-sm transition-all duration-500 hover:border-opacity-40 hover:bg-opacity-80"
              whileHover={{
                boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
                y: -2,
              }}
            >
              <span>See what&apos;s up</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        ref={timelineRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-6 w-full border-t border-white border-opacity-10 pt-16"
      >
        <Timeline entries={TIMELINE} />
      </motion.div>
    </div>
  );
}
