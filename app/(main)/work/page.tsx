import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";

const experiences = [
  {
    name: "Prime Intellect",
    icon: "/icons/prime-intellect.webp",
    href: "/work/prime-intellect",
    year: "2026",
  },
  { name: "Vercel", icon: "/icons/vercel-white.svg", href: "/work/vercel", year: "2026" },
  { name: "K-Scale Labs", icon: "/icons/kscale.svg", href: "/work/kscale", year: "2025" },
  { name: "Maia Chess", icon: "/icons/maia.webp", href: "/work/csslab", year: "2024" },
];

export default function WorkPage() {
  const sorted = [...projects].sort((a, b) => {
    const yearA = parseInt(a.date.match(/\d{4}/)?.[0] || "0");
    const yearB = parseInt(b.date.match(/\d{4}/)?.[0] || "0");
    return yearB - yearA;
  });

  return (
    <section>
      <div className="mb-8 flex flex-col gap-1">
        {experiences.map((experience) => (
          <Link
            key={experience.name}
            href={experience.href}
            className="flex w-full items-center justify-between gap-2 py-0.5 opacity-70 transition-opacity hover:opacity-100"
          >
            <span className="flex items-center gap-2">
              <Image
                src={experience.icon}
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
              <span className="font-medium tracking-wide text-white">
                {experience.name}
              </span>
            </span>
            <span className="text-white/60">{experience.year}</span>
          </Link>
        ))}
      </div>
      <ProjectsGrid projects={sorted} />
    </section>
  );
}
