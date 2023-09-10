import Project from "./Project";
import { ProjectStatus } from "types";
import Me from "assets/img/projects/me.png";
import Turbo from "assets/img/projects/turbo.png";
import Vidio from "assets/img/projects/vidio.png";
import Disbots from "assets/img/projects/disbots.png";
import ChromeAI from "assets/img/projects/chromeai.png";
import GHProfile from "assets/img/projects/ghprofile.png";
import HypixelStats from "assets/img/projects/hypixel_stats.png";
import MinecraftGlobal from "assets/img/projects/minecraft_global.png";

export default function Projects() {
  const projects = [
    {
      status: ProjectStatus.ONLINE,
      image: Me,

      name: "kevinthomas.codes",
      time: "August 2023",
      description: "my portfolio website to showcase my interests, projects, and achievements",
      tags: ["typescript", "react", "framer"],
    },
    {
      status: ProjectStatus.IDLE,
      image: ChromeAI,

      name: "ChromeAI",
      time: "Mar 2023 (idle)",
      description: "an intuitive chrome extension that puts the power of gpt at your fingertips",
      tags: ["chrome", "react", "fastify", "postgresql", "typescript"],
    },
    {
      status: ProjectStatus.IDLE,
      image: MinecraftGlobal,

      name: "minecraft.global",
      time: "May 2021 (idle)",
      stat: "3000+ monthly users",
      description: "a new minecraft server list with exciting new features and phenomenal ui",
      tags: ["next", "postgresql", "stripe"],
    },
    {
      status: ProjectStatus.OFFLINE,
      image: Turbo,
      time: "Mar 2021 → Dec 2021",
      name: "turbo",
      description: "a chromium-based web browser equipped with a vast array of developer tools",
      tags: ["chromium", "electron", "next"],
    },
    {
      status: ProjectStatus.OFFLINE,
      image: GHProfile,
      time: "Nov 2020 → Jun 2023",
      name: "ghprofile.me",
      stat: "135 subscriptions",
      description: "a clean and simple github readme view counter with graphs and embeds",
      tags: ["react", "fastify", "postgresql"],
    },
    {
      status: ProjectStatus.OFFLINE,
      image: Disbots,
      name: "disbots.gg",
      time: "Jul 2020 → Oct 2020",
      stat: "1000+ monthly users",
      description: "a discord bot listing website with clean, intuitive UI and many new features",
      tags: ["vue", "express", "socket.io"],
    },
    {
      status: ProjectStatus.OFFLINE,
      image: HypixelStats,
      time: "Jun '20 → Dec '20",
      name: "hypixel stats",
      stat: "2500+ servers",
      description: "a discord bot that brings hypixel player statistics to your discord server",
      tags: ["python", "discord.py"],
    },
    {
      status: ProjectStatus.OFFLINE,
      image: Vidio,
      time: "Mar 2020 → Sep 2020",
      name: "vidio",
      stat: "400+ servers",
      description:
        "my first discord bot; a youtube simulator that allowed people to roleplay youtubers",
      tags: ["python", "discord.py"],
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4">
      {projects.map((project, i) => (
        <Project key={i} i={i + 1} {...project} />
      ))}
    </div>
  );
}
