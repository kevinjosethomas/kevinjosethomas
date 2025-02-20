"use client";

import { useState } from "react";
import Project from "../components/Project";
import { Gallery } from "react-grid-gallery";
import MinecraftContent from "./minecraft.mdx";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

export default function Minecraft() {
  const [index, setIndex] = useState(-1);

  const images = [
    {
      src: "/images/projects/minecraft/1.jpg",
      width: 800,
      height: 449,
    },
    {
      src: "/images/projects/minecraft/2.jpg",
      width: 1100,
      height: 618,
    },
    {
      src: "/images/projects/minecraft/3.jpg",
      width: 2514,
      height: 1266,
    },
    {
      src: "/images/projects/minecraft/4.jpg",
      width: 1824,
      height: 1026,
    },
    {
      src: "/images/projects/minecraft/5.jpg",
      width: 1929,
      height: 1095,
    },
    {
      src: "/images/projects/minecraft/6.jpg",
      width: 1920,
      height: 1080,
    },
    {
      src: "/images/projects/minecraft/7.jpg",
      width: 1824,
      height: 1026,
    },
    {
      src: "/images/projects/minecraft/8.jpg",
      width: 1920,
      height: 1080,
    },
    {
      src: "/images/projects/minecraft/9.jpg",
      width: 1921,
      height: 1126,
    },
    {
      src: "/images/projects/minecraft/10.jpg",
      width: 1100,
      height: 618,
    },
    {
      src: "/images/projects/minecraft/11.jpg",
      width: 1100,
      height: 618,
    },
  ];

  return (
    <Project
      name="minecraft.global"
      image="minecraft.global.png"
      banner="minecraft.global.png"
    >
      <div className="prose prose-invert max-w-none">
        <MinecraftContent />
      </div>
      <p>
        When I moved from Toronto to Vancouver in mid-2021, my friend and I
        started working on a Minecraft server marketplace that would help server
        owners advertise their projects, grow their audience, and increase their
        income. Our vision was pretty clear: make an unparalleled platform that
        seamlessly connects players with an array of servers with a clean and
        convenient user experience.
      </p>
      <p>
        Over the next 4-5 months, we developed multiple iterations of this
        project and released it to the Minecraft community. Throughout this
        time, I primarily worked on designing and developing two versions of the
        front end of the website, as well as planning our growth and
        member-acquisition plans with my co-founder. When we launched, we had an
        extremely clean and intuitive user interface, new features like server
        analytics and cleaner search experiences, and a simpler and smoother
        Minecraft server discovery experience.
      </p>
      <p>
        After our launch, we assisted over 200 Minecraft servers to connect with
        over 20,000 new players and we earned hundreds of dollars in ad revenue.
        Unfortunately, despite having a phenomenal product, I didn&apos;t have
        the time to commit to scaling the project to its full potential and
        stopped working on it in early 2022. However, although being idle, the
        website continues to help over 2000 Minecraft players find new servers
        every month and also assists server owners with getting their projects
        discovered.
      </p>
      <p>
        minecraft.global was the first time I effectively put my web-development
        skills to use. Despite being limited to a gaming audience, the project
        was an incredible learning experience and thoroughly tested my
        commitment and willpower. It helped me develop a stronger understanding
        of web development and modern tech stacks, and provided me with many
        skills I still utilize today. I&apos;ve attached some images of the v2
        website, as well some screenshots from the v1 design process below.
      </p>
      <Gallery
        images={images}
        enableImageSelection={false}
        onClick={(i: number) => setIndex(i)}
      />
      <Lightbox
        slides={images}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </Project>
  );
}
