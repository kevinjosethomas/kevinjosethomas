import Link from "next/link";
import Image from "next/image";
import Stack from "@/components/Stack";
import Geometry from "@/components/Geometry";
import Tooltip from "@/components/Tooltip";
import { projects } from "@/data/projects";
import Highlight from "@/components/Highlight";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
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
    "turbo",
    "kos",
    "asl",
    "scrapyard",
  ];

  const spotlightedProjects = projects.filter((project) =>
    spotlightedProjectIds.includes(project.id),
  );

  return (
    <div className="flex w-full flex-col items-start justify-start">
      {/* Hero Section */}
      <div className="border-border relative grid w-full grid-cols-6 items-center border-b">
        <div className="text-secondary col-span-4 flex max-w-2xl flex-col gap-8 p-16 text-lg">
          <p className="text-lg font-bold tracking-wide">( ^_^)／</p>
          <p>
            I&apos;m a Computer Science student at the University of Waterloo.
            Currently, I lead engineering for the{" "}
            <Highlight rotate={1} href="/work/csslab" className="px-0.5">
              Maia Chess
            </Highlight>
            <Tooltip
              number={1}
              content="Maia is an open research project on human-AI collaboration in chess— studying how neural networks can model human behaviour. As the most-played bot on Lichess, Maia uses chess as a testbed for broader ML research."
            />{" "}
            project— the world&apos;s most popular chess bot.
          </p>
          <p>
            Previously, I was a SWE intern at{" "}
            <Highlight href="/work/kscale" rotate={2}>
              K-Scale Labs
            </Highlight>
            <Tooltip
              number={2}
              content="K-Scale Labs is developing America's first open-source, general-purpose humanoid robot— building a complete in-house stack spanning hardware, software, RL, and simulation to enable a fully capable general-purpose humanoid."
            />{" "}
            in Palo Alto. I also worked on{" "}
            <Highlight href="/project/asl" rotate={2}>
              neural sign language translation
            </Highlight>
            ,
            <Tooltip
              number={3}
              content="With my high school also being BC's only school for the Deaf, I was inspired to build a CV model to classify ASL fingerspelling and generate sign language poses for real-time translation between students. ASL translation remains an unsolved problem and should be developed in close collaboration with the Deaf community."
            />{" "}
            and organized hackathons for Hack Club.{" "}
            <Tooltip
              number={4}
              content="I organized Hack Club Scrapyard—a global high school hackathon ($200,000 in funding) in Austin TX and 60+ cities around the world. I also founded the British Columbia Youth Developer Collective, a community of over 400 high school developers across BC."
            />
          </p>
        </div>

        <Geometry />
      </div>

      {/* Experience Section */}
      <div className="border-border grid w-full grid-rows-2 border-b md:grid-cols-2 md:grid-rows-1">
        <Link href="/work/kscale">
          <div className="relative transition-all duration-300 hover:saturate-150">
            <Image
              className="h-full w-full object-cover"
              src="/experience/k-scale.png"
              alt="K-Scale Labs"
              width={592}
              height={350}
            />
            <Image
              className="absolute right-6 bottom-6"
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
              className="h-full w-full object-cover"
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
      <div className="border-border flex w-full flex-col items-start justify-between gap-8 border-b md:flex-row md:gap-0">
        <div className="flex flex-col items-start justify-start px-16 pt-16 md:p-16">
          <h3 className="text-2xl font-semibold">Writing</h3>
        </div>
        <div className="flex flex-col items-end justify-start px-16 pb-16 md:p-16">
          <ul className="flex list-disc flex-col items-start justify-start text-xl font-light">
            {featuredArticles.map((article) => (
              <li key={article.id}>
                <Link href={article.href} target="_blank">
                  <p className="hover:underline">{article.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Projects Section */}
      <div className="border-border grid w-full grid-cols-1 gap-6 border-b md:grid-cols-3 md:gap-0">
        <div className="border-border flex flex-col items-start justify-start border-r px-16 pt-16 md:p-16">
          <h3 className="text-2xl font-semibold">Projects</h3>
        </div>

        <div className="border-border flex flex-col items-center gap-6 border-r py-0 md:items-end md:py-16 md:pl-16">
          {spotlightedProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="border-border flex flex-col items-center gap-6 border-r py-0 md:items-end md:py-16 md:pl-16">
          {spotlightedProjects.slice(3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <Stack />

      {/* Publication Section */}
      <div className="flex w-full flex-col items-start p-16">
        <Link
          href="https://arxiv.org/abs/2408.09311"
          target="_blank"
          className="group"
        >
          <div className="flex items-center gap-2">
            <Image src="/icons/arxiv.svg" alt="arXiv" width={16} height={16} />
            <p className="text-secondary text-sm group-hover:opacity-70">
              arXiv:2408.09311 [cs.CL]
            </p>
          </div>
          <p className="text-2xl font-semibold group-hover:opacity-70">
            An Open-Source American Sign Language Fingerspell Recognition and
            Semantic Pose Retrieval Interface
          </p>
        </Link>
      </div>
    </div>
  );
}
