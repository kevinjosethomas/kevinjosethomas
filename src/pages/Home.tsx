import { motion } from "framer-motion";

import Image from "assets/images/home.jpg";
import PageWrapper from "ui/wrappers/PageWrapper";
import Presence from "ui/components/Presence/Presence";

const Home = () => {
  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/kevinjosethomas",
    },
    {
      label: "Discord",
      href: "https://discord.com/users/418707912836382721s",
    },
    {
      label: "Twitter",
      href: "https://twitter.com/kevinjosethomas",
    },
  ];

  return (
    <PageWrapper name image={{ alt: "me!", src: Image, style: "w-1/3" }}>
      <div className="font-inter text-md flex flex-col items-start gap-4 text-white text-opacity-80 2xl:text-xl 3xl:text-2xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Hey! I'm a student and full-stack developer from Vancouver, Canada. I spend most of my
          time at school, writing code, listening to music or hanging out {"<3"}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Over the last three years, I've gained a strong expertise in Python, Javascript,
          PostgreSQL and React. I've worked on dozens of projects ranging from websites and APIs to
          Discord bots and scripts. I've successfully grown my portfolio to regularly freelance,
          participate in hackathons, and monetize my projects.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Now, I spend most of my time in high school and preparing for university. I'm hoping to
          start developing software that can make a positive impact on people around me.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex"
        >
          Reach out:{" "}
          <div className="ml-2 flex items-center space-x-2">
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
