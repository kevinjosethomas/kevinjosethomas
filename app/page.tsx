import Image from "next/image";
import Stack from "@/components/Stack";

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
      <div className="border-border relative flex h-[708px] w-full flex-col items-start justify-center overflow-hidden border-b p-24">
        <div className="z-10 flex max-w-md flex-col items-start justify-start gap-6 tracking-wide">
          <p className="font-micro5 text-4xl">hey!</p>
          <p className="text-xl">
            Currently, I lead engineering for the Maia Chess project— the
            world&apos;s most popular chess bot.
          </p>
          <p className="text-xl">
            Previously, I was SWE at K-Scale Labs in Palo Alto. Studying CS at
            UWaterloo.
          </p>
        </div>
        <div className="absolute top-0 right-0">
          <div className="relative grid grid-cols-6 grid-rows-6 gap-0">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="border-border box-border h-[118px] w-[118px] border"
              />
            ))}
            <div
              className="pointer-events-none absolute top-0 left-0 h-[475px] w-[355px]"
              style={{
                background:
                  "radial-gradient(ellipse at top left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-[475px] w-[355px]"
              style={{
                background:
                  "radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="border-border grid w-full grid-cols-2 border-b">
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
      <div className="border-border flex w-full flex-row items-start justify-between border-b">
        <div className="flex flex-col items-start justify-start p-16">
          <h3 className="text-2xl font-semibold">Writing</h3>
        </div>
        <div className="flex flex-col items-end justify-start p-16">
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
      <div className="border-border grid w-full grid-cols-3 border-b">
        <div className="border-border flex flex-col items-start justify-start border-r p-16">
          <h3 className="text-2xl font-semibold">Projects</h3>
        </div>

        <div className="border-border flex flex-col items-end gap-6 border-r py-16 pl-16">
          {spotlightedProjects.slice(0, 3).map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
        <div className="border-border flex flex-col items-end gap-6 border-r py-16 pl-16">
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
