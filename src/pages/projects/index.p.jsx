import Head from "next/head";

import Default from "ui/layouts/Default";
import Project from "./components/Project";

export default function Projects(props) {
  const projects = [
    {
      title: "minecraft.global",
      subtitle: "website + api",
      description:
        "A new Minecraft server list developed with nextjs, fastapi and postgresql. It sports exciting new features and phenomenal ui in the server listing industry. Currently launched but v2 is under development!",
      date: "may 21 -",
      status: 1,
      href: "https://minecraft.global/",
    },
    {
      title: "turbo",
      subtitle: "web browser",
      description:
        "A web browser created specifically for developers. Currently idle as I don't have the technical knowledge to maintain a Chromium fork. (original beta was made in electron)",
      date: "mar 21 -",
      status: 0,
      href: "https://turbobrowser.io/",
    },
    {
      title: "kevinthomas.codes",
      subtitle: "website",
      description:
        "Literally this website :) Created in my free time after my Discord account got hacked :/ Developed with nextjs, tailwindcss and framer-motion. Design inspired by opensource - phineas.io & alistair.sh",
      date: "nov 21 -",
      status: 1,
      href: "https://kevinthomas.codes/",
    },
    {
      title: "ghprofile.me",
      subtitle: "website + api",
      description:
        "My first project using React. A GitHub profile view counter that lets users embed a view counter image into their readme files to track the number of profile views they get. Numbers are displayed in a chart on a dashboard.",
      date: "nov 20 -",
      status: 1,
      href: "https://ghprofile.me/",
    },
    {
      title: "disbots.gg",
      subtitle: "website + api",
      description:
        "A Discord bot listing website with clean, intuitive UI and many new features. My first time creating a large project or a web application. Developed with node/express, socket.io and html files + vuejs.",
      date: "jul 20 - oct 20",
      status: -1,
    },
    {
      title: "hypixel stats",
      subtitle: "discord bot",
      description:
        "A verified Discord bot (2000+ servers) that interacted with the official Hypixel API to bring player statistics into Discord. Developed in Python with my friend Iapetus11. Code moved to Villager Bot to reduce maintenance.",
      date: "jun 20 - dec 20",
      status: -1,
      href: "https://github.com/Iapetus-11/Hypixel-Stats",
    },
    {
      title: "vidio",
      subtitle: "discord bot",
      description:
        "My first public Discord bot - a YouTube simulation bot that allowed players to create a simulation of a YouTube channel. They could upload videos and buy in-game cosmetics via Discord commands.",
      date: "mar 20 - sep 20",
      status: -1,
      href: "https://github.com/trustedmercury/vidio",
    },
  ];

  return (
    <Default>
      <Head>
        <title>Projects • Kevin Thomas</title>
        <meta name="title" content="Projects • Kevin Thomas" />
        <meta property="og:title" content="Projects • Kevin Thomas" />
        <meta property="twitter:title" content="Projects • Kevin Thomas" />
      </Head>
      <div className="flex flex-col items-start justify-start w-full space-y-4">
        <h1 className="font-bold text-4xl text-white text-opacity-80 tracking-[-0.02rem]">
          💭 Projects
        </h1>
        <div className="flex flex-col items-start justify-start w-full space-y-2">
          {projects.map((project, index) => (
            <Project key={index} index={index} {...project} />
          ))}
        </div>
      </div>
    </Default>
  );
}
