import { motion } from "framer-motion";

import PageWrapper from "ui/wrappers/PageWrapper";
import Image from "assets/images/home.jpg";

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
    <PageWrapper image={{ alt: "me!", src: Image, style: "w-1/3" }}>
      <div className="flex flex-col space-y-4">
        <motion.p
          className="font-inter text-xl font-medium text-white text-opacity-80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Hey! I'm a student and full-stack developer from Vancouver, Canada. I spend most of my
          time at school, writing code, listening to music or hanging out {"<3"}
        </motion.p>
        <motion.p
          className="font-inter text-xl font-medium text-white text-opacity-80"
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
          className="font-inter text-xl font-medium text-white text-opacity-80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Now, I spend most of my time in high school and preparing for university. I'm hoping to
          start developing software that can make a positive impact on people around me.
        </motion.p>
        <motion.p
          className="font-inter flex text-xl font-medium text-white text-opacity-80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          Reach out:{" "}
          <div className="ml-2 flex items-center space-x-2">
            {socials.map((s, i) => (
              <div className="relative transition duration-500 hover:opacity-80">
                <a key={i} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
                <div className="absolute bottom-0.5 h-0.5 w-full bg-white" />
              </div>
            ))}
          </div>
        </motion.p>
      </div>
    </PageWrapper>
  );
};

export default Home;
