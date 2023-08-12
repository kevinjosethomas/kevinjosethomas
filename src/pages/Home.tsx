import { motion } from "framer-motion";

import Wave from "assets/img/wave.png";
import Image from "assets/img/home.jpg";
import PageWrapper from "ui/wrappers/PageWrapper";
import Presence from "ui/components/Presence/Presence";

const Home = () => {
  const socials = [
    {
      label: "github",
      href: "https://github.com/kevinjosethomas",
    },
    {
      label: "discord",
      href: "https://discord.com/users/418707912836382721s",
    },
    {
      label: "twitter",
      href: "https://twitter.com/kevinjosethomas",
    },
  ];

  return (
    <PageWrapper name image={{ alt: "me!", src: Image, style: "w-1/3" }}>
      <div className="text-md flex flex-col items-start gap-4 text-white text-opacity-80 2xl:text-xl 3xl:text-2xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          hey! <img src={Wave} alt="Wave" className="mx-1 inline h-6" draggable="false" /> i'm a
          high school junior from vancouver with a passion for computer science and software
          development.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          over the last four years, i've built proficiency in python, typescript, java, postgresql
          and a couple other languages and frameworks. i use my full-stack experience to work on
          developing efficient software with modern design and exceptional user experiences.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          now, most of my life is off my computer: exploring yvr, volunteering, or playing badminton
          and grinding my academic arc. i spend most of my time trying out new things, making new
          friends and preparing for post-secondary.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          although most of my time is in school, i still enjoy learning about new technology,
          participating in hackathons and occasionally freelancing or workingf on a few side
          projects.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex"
        >
          reach out:{" "}
          <div className="ml-2 flex items-center gap-2">
            {socials.map((s, i) => (
              <div key={i} className="relative transition duration-500 hover:opacity-80">
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
    </PageWrapper>
  );
};

export default Home;
