import { motion } from "framer-motion";

import { Default } from "../layouts/default";
import { Project } from "../components/Project";
import {
  ProjectTitleSlideUp,
  ProjectOneSlideUp,
  ProjectTwoSlideUp,
  ProjectThreeSlideUp,
  ProjectFourSlideUp,
  ProjectFiveSlideUp,
} from "../util/Animations";

const Projects = (props) => {
  return (
    <Default>
      <div className="flex flex-col items-center justify-center my-24 xl:px-32 2xl:px-52 w-full h-full">
        <motion.span
          initial="initial"
          animate="animate"
          variants={ProjectTitleSlideUp}
          className="mb-4 font-proxima font-bold text-5xl text-gray-300"
        >
          PROJECTS
        </motion.span>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 place-items-center gap-20">
          <motion.div
            initial="initial"
            animate="animate"
            variants={ProjectOneSlideUp}
          >
            <Project
              from="from-purple-500"
              to="to-purple-400"
              genre="WEB BROWSER"
              name="TURBO"
              description="Currently under development, Turbo is a web browser made specifically for
              developers! It helps streamline your dev process by prioritizing developer-friendly software.
              It will offer tons of features without bloatware - fully keyboard navigationable, integrated API client, public port tunneling and more!"
              type="WEBSITE"
              redirect="https://turbobrowser.io/"
            />
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={ProjectTwoSlideUp}
          >
            <Project
              from="from-green-500"
              to="to-green-400"
              genre="WEBSITE"
              name="MINECRAFT.GLOBAL"
              description="minecraft.global is a Minecraft server listing website that is currently under development.
              It brings many new features to the Minecraft server listing field. From live server analytics and upvote
              systems to player charts and advertisement auctions, it pretty much has it all. Launching June/July 2021,
              with next/react frontend and python fastapi backend!"
              type="WEBSITE"
              redirect="https://minecraft.global/"
            />
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={ProjectThreeSlideUp}
          >
            <Project
              from="from-yellow-500"
              to="to-yellow-400"
              genre="WEBSITE + INTEGRATION"
              name="GHPROFILE.ME"
              description="ghprofile.me is a website and GitHub integration, currently in BETA. It allows you to
            monitor the number of views your GitHub profiles and repositories get. It also displays these statistics
            in an intuitive manner on a web dashboard. I plan to add more features like GitHub badges, statistics and more soon!"
              type="REPOSITORY"
              redirect="https://github.com/trustedmercury/ghprofile.me/"
            />
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={ProjectFourSlideUp}
          >
            <Project
              from="from-red-500"
              to="to-red-400"
              genre="DISCORD BOT"
              name="VIDIO"
              description="vidio is a YouTube simulation Discord bot. It provides fun features that allows players
              to create and maintain a YouTube channel. As you upload, engage and grow, you compete
              against other players from all across Discord. Earn money, balance your happiness and
              keep uploading to become the best vidio channel on Discord!"
              type="REPOSITORY"
              redirect="https://github.com/trustedmercury/vidio/"
            />
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={ProjectFiveSlideUp}
          >
            <Project
              from="from-blue-500"
              to="to-blue-400"
              genre="WEBSITE + BOT"
              name="DISBOTS.GG"
              description="disbots.gg was a Discord bot listing site. With superior UI and functionality,
            the fastest and most streamlined reviewal system, disbots.gg changed the way Discord bot listing worked.
            Unfortunately, I decided to take it down after a couple months, and started the codebyte development
            team which continues to create great (opensource) applications!"
              type="ARCHIVE"
              redirect="https://disbots.kevinthomas.codes/"
            />
          </motion.div>
        </div>
      </div>
    </Default>
  );
};

export default Projects;
