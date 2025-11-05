import Image from "next/image";
import Stack from "@/components/Stack";
import Globe from "@/components/Globe";

export default function Home() {
  const spotlightedProjects = [
    {
      id: "emx",
      name: "Emotional Matrix (EMX)",
      date: "2025",
      href: "/project/emx",
      image: "/projects/emx.png",
    },
    {
      id: "maia",
      name: "Maia Chess",
      date: "2024-",
      href: "/project/maia",
      image: "/projects/maia.png",
    },
    {
      id: "turbo",
      name: "Turbo Browser",
      date: "2021",
      href: "/project/turbo",
      image: "/projects/turbo.png",
    },
    {
      id: "kos",
      name: "kos-sdk",
      date: "2025",
      href: "/project/kos-sdk",
      image: "/projects/kos.png",
    },

    {
      id: "asl",
      name: "Neural Sign Language Translation",
      date: "2024",
      href: "/project/asl",
      image: "/projects/asl.png",
    },

    {
      id: "scrapyard",
      name: "Hack Club Scrapyard",
      date: "2024",
      href: "/project/scrapyard",
      image: "/projects/scrapyard.png",
    },
  ];

  const Project = ({
    project,
  }: {
    project: (typeof spotlightedProjects)[number];
  }) => {
    return (
      <div className="border-border flex w-full flex-col border-t border-b border-l">
        <div className="relative">
          <div className="absolute top-0 left-0 h-full w-full" />
          <Image
            className="h-full w-full object-cover"
            src={project.image}
            alt={project.name}
            width={346}
            height={225}
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <p className="text-sm">{project.name}</p>
          <p className="text-secondary text-sm">{project.date}</p>
        </div>
      </div>
    );
  };

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
        <div className="relative">
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
        <div className="relative">
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
      </div>

      {/* Writing Section */}
      <div className="border-border flex w-full flex-col items-start justify-between gap-8 border-b md:flex-row md:gap-0">
        <div className="flex flex-col items-start justify-start px-16 pt-16 md:p-16">
          <h3 className="text-2xl font-semibold">Writing</h3>
        </div>
        <div className="flex flex-col items-end justify-start px-16 pb-16 md:p-16">
          <ul className="flex list-disc flex-col items-start justify-start text-xl font-light">
            <li>
              <a href="https://kevinjosethomas.com/writing/1">
                <p>Another Week at K-Scale Labs</p>
              </a>
            </li>
            <li>
              <a href="https://kevinjosethomas.com/writing/2">
                <p>Reflecting on Scrapyard— What We Did in Austin TX and...</p>
              </a>
            </li>
            <li>
              <a href="https://kevinjosethomas.com/writing/3">
                <p>Stanford CS229 Lecture 1</p>
              </a>
            </li>
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
            <Project key={project.id} project={project} />
          ))}
        </div>
        <div className="border-border flex flex-col items-center gap-6 border-r py-0 md:items-end md:py-16 md:pl-16">
          {spotlightedProjects.slice(3).map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </div>

      <Stack />

      {/* Publication Section */}
      <div className="border-border flex w-full flex-col items-start border-t p-16">
        <div className="flex items-center gap-2">
          <Image src="/icons/arxiv.svg" alt="arXiv" width={16} height={16} />
          <p className="text-secondary text-sm">arXiv:2408.09311 [cs.CL]</p>
        </div>
        <p className="text-2xl font-semibold">
          An Open-Source American Sign Language Fingerspell Recognition and
          Semantic Pose Retrieval Interface
        </p>
      </div>
    </div>
  );
}
