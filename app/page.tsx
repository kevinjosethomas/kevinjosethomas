import Image from "next/image";
import Stack from "@/components/Stack";
import Globe from "@/components/Globe";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const spotlightedWriting = [
    {
      id: "kscale",
      name: "Another Week at K-Scale Labs",

      href: "https://knowledge.kevinjosethomas.com/Thoughts/Another-Week-at-K-Scale-Labs",
    },
    {
      id: "scrapyard",
      name: "Reflecting on Scrapyard— What We Did in Austin TX and...",
      href: "https://knowledge.kevinjosethomas.com/Thoughts/Reflecting-on-Scrapyard-—-What-We-Did-in-Austin-TX-and-60+-Cities-around-the-World",
    },
    {
      id: "cs229",
      name: "Stanford CS229 Lecture 1",
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
      <div className="border-border relative flex h-[708px] w-full flex-col items-start justify-center overflow-hidden border-b p-16 md:p-24">
        <div className="z-10 flex max-w-md flex-col items-start justify-start gap-6 tracking-wide">
          <p className="font-micro5 text-4xl tracking-wider">hey!</p>
          <p className="text-xl">
            I&apos;m studying CS @ UWaterloo. Currently, I lead engineering for
            the Maia Chess project— the world&apos;s most popular chess bot.
          </p>
          <p className="text-xl">
            Previously SWE intern @ K-Scale Labs in Palo Alto.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-56 -bottom-[600px] h-[1000px] w-[1000px] overflow-hidden md:-bottom-72">
          <Globe />
        </div>
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
            {spotlightedWriting.map((writing) => (
              <li key={writing.id}>
                <Link href={writing.href} target="_blank">
                  <p className="hover:underline">{writing.name}</p>
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
