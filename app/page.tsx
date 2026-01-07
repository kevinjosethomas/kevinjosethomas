import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import Stack from "@/components/Home/Stack";
import Charts from "@/components/Home/Charts";
import Geometry from "@/components/Home/Geometry";
import Tooltip from "@/components/Common/Tooltip";
import { projects } from "@/data/projects";
import Highlight from "@/components/Home/Highlight";
import ProjectCard from "@/components/Common/ProjectCard";

export default async function Home() {
  const featuredArticles = [
    {
      id: "kscale",
      title: "Another Week at K-Scale Labs",
      href: "https://knowledge.kevinjosethomas.com/Thoughts/Another-Week-at-K-Scale-Labs",
    },
    {
      id: "scrapyard",
      title: "Reflecting on Scrapyard— What We Did in Austin TX and...",
      href: "https://knowledge.kevinjosethomas.com/Thoughts/Reflecting-on-Scrapyard-—-What-We-Did-in-Austin-TX-and-60+-Cities-around-the-World",
    },
    {
      id: "cs229",
      title: "Stanford CS229 Lecture 1",
      href: "https://knowledge.kevinjosethomas.com/Learning/Stanford-CS229/CS229-Lecture-1",
    },
  ];

  const spotlightedProjectIds = [
    "emx",
    "maia",
    "asl",
    "kos",
    "minecraft",
    "valorant",
  ];

  const spotlightedProjects = spotlightedProjectIds.map(
    (id) => projects.find((project) => project.id === id) as Project,
  );

  const interleavedProjects: Project[] = [];
  const leftColumn = spotlightedProjects.slice(0, 3);
  const rightColumn = spotlightedProjects.slice(3);
  for (let i = 0; i < Math.max(leftColumn.length, rightColumn.length); i++) {
    if (leftColumn[i]) interleavedProjects.push(leftColumn[i] as Project);
    if (rightColumn[i]) interleavedProjects.push(rightColumn[i] as Project);
  }

  return (
    <div className="flex w-full flex-col items-start justify-start">
      {/* Hero Section */}
      <div className="border-border relative flex w-full flex-col items-center border-b md:grid md:grid-cols-6 md:grid-rows-1">
        <div className="text-secondary flex w-full flex-col gap-8 p-6 text-lg md:col-span-4 md:w-auto md:max-w-2xl md:p-16">
          <p className="font-bold tracking-wide">👋</p>
          <p>
            I&apos;m a Computer Science student at the University of Waterloo.
            Currently, I&apos;m working on{" "}
            <span style={{ display: "inline-flex", verticalAlign: "middle" }}>
              <Image
                className="vertical-middle inline-block"
                src="/icons/v0.svg"
                alt="v0"
                width={22}
                height={22}
              />
            </span>{" "}
            at{" "}
            <Highlight href="https://vercel.com" icon="/icons/vercel-white.svg">
              Vercel
            </Highlight>{" "}
            in San Francisco.
          </p>
          <p>
            Previously, I was a SWE intern at{" "}
            <Highlight href="/work/kscale" icon="/icons/kscale.svg" rotate={1}>
              K-Scale Labs
            </Highlight>
            <Tooltip
              number={1}
              content="K-Scale Labs is developing America's first open-source, general-purpose humanoid robot— building a complete in-house stack spanning hardware, software, RL, and simulation to enable a fully capable general-purpose humanoid."
            />{" "}
            in Palo Alto, and led engineering for the{" "}
            <Highlight href="/work/csslab" icon="/icons/maia.png">
              Maia Chess
            </Highlight>
            <Tooltip
              number={2}
              content="Maia is an open research project on human-AI collaboration in chess— studying how neural networks can model human behaviour. As the most-played bot on Lichess, Maia uses chess as a testbed for broader ML research."
            />{" "}
            project— the world&apos;s most popular chess bot.
          </p>
          {/* <p>
            I also worked on{" "}
            <Highlight href="/project/asl">
              neural sign language translation
            </Highlight>
            ,
            <Tooltip
              number={3}
              content="With my high school also being BC's only school for the Deaf, I was inspired to build a CV model to classify ASL fingerspelling and generate sign language poses for real-time translation between students. ASL translation remains an unsolved problem and should be developed in close collaboration with the Deaf community."
            />{" "}
            and organized for Hack Club.{" "}
            <Tooltip
              number={4}
              content="I organized Hack Club Scrapyard—a global high school hackathon ($200,000 in funding) in Austin TX and 60+ cities around the world. I also founded the British Columbia Youth Developer Collective, a community of over 400 high school developers across BC."
            />
          </p> */}
        </div>

        <Geometry />
      </div>

      {/* Experience Section */}
      <div className="border-border grid w-full grid-rows-2 border-b md:grid-cols-2 md:grid-rows-1">
        <Link href="/work/kscale">
          <div className="relative transition-all duration-300 hover:saturate-150">
            <Image
              draggable={false}
              className="h-full w-full object-cover select-none"
              src="/experience/k-scale.png"
              alt="K-Scale Labs"
              width={592}
              height={350}
            />
            <Image
              draggable={false}
              className="absolute right-6 bottom-6 select-none"
              src="/experience/k-scale-logo.svg"
              alt="K-Scale Labs"
              width={192}
              height={40}
            />
          </div>
        </Link>
        <Link href="/work/csslab">
          <div className="relative transition-all duration-300 hover:saturate-200">
            <Image
              draggable={false}
              className="h-full w-full object-cover select-none"
              src="/experience/csslab.png"
              alt="CSSLab"
              width={592}
              height={350}
            />
            <p className="absolute right-6 bottom-4 text-3xl font-bold tracking-tight">
              CSSLab
            </p>
          </div>
        </Link>
      </div>

      {/* Writing Section */}
      <div className="border-border flex w-full flex-col items-start justify-start gap-4 overflow-x-hidden border-b p-6 md:flex-row md:justify-between md:gap-8 md:p-16 lg:gap-0">
        <div className="flex flex-col items-start justify-start">
          <h3 className="text-2xl font-semibold">Writing</h3>
        </div>
        <div className="flex w-full flex-1 flex-col items-start justify-start overflow-x-hidden lg:items-end">
          <ul className="flex list-inside list-disc flex-col items-start justify-start text-lg font-light md:text-xl">
            {featuredArticles.map((article) => (
              <li key={article.id} className="whitespace-nowrap">
                <Link
                  href={article.href}
                  target="_blank"
                  className="inline-block whitespace-nowrap"
                >
                  <p className="text-secondary text-ellipsis hover:underline md:text-white">
                    {article.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Projects Section */}
      <div className="border-border grid w-full grid-cols-1 border-b pb-6 md:grid-cols-3 md:pb-0">
        <div className="top-0 flex flex-col items-start justify-start gap-4 self-start p-6 md:sticky md:p-16">
          <h3 className="text-2xl font-semibold">Projects</h3>
          <p className="text-secondary text-base">
            I build across domains to learn fast and contribute everywhere I
            can—whether it&apos;s robotics, applied ML, accessibility, or
            anything in between.
          </p>
        </div>

        {/* Mobile: Interleaved order */}
        <div className="flex flex-col items-center gap-6 py-0 md:hidden">
          {interleavedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} dark={20} />
          ))}
        </div>

        {/* Desktop: Two columns */}
        <div className="border-border hidden flex-col items-center gap-6 border-x py-0 md:flex md:items-end md:py-16 md:pl-16">
          {spotlightedProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} dark={20} />
          ))}
        </div>
        <div className="border-border hidden flex-col items-center gap-6 border-r py-0 md:flex md:items-end md:py-16 md:pl-16">
          {spotlightedProjects.slice(3).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              dark={20}
              saturate={75}
            />
          ))}
        </div>
      </div>

      <Stack />

      {/* Publication Section */}
      <div className="border-border flex w-full flex-col items-start border-b p-6 py-10 md:p-16">
        <Link
          href="https://arxiv.org/abs/2408.09311"
          target="_blank"
          className="group"
        >
          <div className="flex items-center gap-2">
            <Image
              alt="arXiv"
              src="/icons/arxiv.svg"
              className="select-none"
              draggable={false}
              width={16}
              height={16}
            />
            <p className="text-secondary text-sm group-hover:opacity-70">
              arXiv:2408.09311 [cs.CL]
            </p>
          </div>
          <p className="text-lg font-semibold group-hover:opacity-70 md:text-2xl">
            An Open-Source American Sign Language Fingerspell Recognition and
            Semantic Pose Retrieval Interface
          </p>
        </Link>
      </div>

      <Charts />
    </div>
  );
}
