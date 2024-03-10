import StackView from "./components/Stack";
import Banner from "@/ui/components/Banner";
import Technology from "./components/Technology";
import { Stack as StackType, Technology as TechnologyType } from "@/types";

export default function Stack() {
  const stacks: StackType[] = [
    {
      icon: "/images/stack/python.svg",
      color: "bg-[#DFBA39]",
      name: "Python",
      description:
        "For competitive programming, quick scripts, discord bots and libraries",
    },
    {
      icon: "/images/stack/typescript.svg",
      color: "bg-[#3178C6]",
      name: "TypeScript",
      description:
        "For all frontend applications (next), APIs (fastify) and chrome extensions",
    },
    {
      icon: "/images/stack/postgresql.svg",
      color: "bg-[#4169E1]",
      name: "PostgreSQL",
      description:
        "My go-to SQL database software, with asyncpg (python) & pg (node)",
    },
    {
      icon: "/images/stack/react.svg",
      color: "bg-[#087ea4]",
      name: "React",
      description:
        "My go-to frontend framework for all websites, usually with NextJS",
    },
  ];

  const technology: TechnologyType[] = [
    { name: "NextJS", icon: "/images/stack/nextjs.svg" },
    { name: "Tailwind", icon: "/images/stack/tailwind.svg" },
    { name: "GitHub", icon: "/images/stack/github.svg" },
    { name: "Actions", icon: "/images/stack/actions.svg" },
    { name: "Java", icon: "/images/stack/java.svg" },
    { name: "Figma", icon: "/images/stack/figma.svg" },
    { name: "Framer", icon: "/images/stack/framer.svg" },
    { name: "React Native", icon: "/images/stack/react-native.svg" },
    { name: "Expo", icon: "/images/stack/expo.svg" },
    { name: "Visual Studio", icon: "/images/stack/vsc.svg" },
    { name: "Chrome API", icon: "/images/stack/chrome.svg" },
    { name: "Discord API", icon: "/images/stack/discord.svg" },
    { name: "Stripe", icon: "/images/stack/stripe.svg" },
    { name: "Electron", icon: "/images/stack/electron.svg" },
    { name: "Postman", icon: "/images/stack/postman.svg" },
    { name: "PyPI", icon: "/images/stack/pypi.svg" },
    { name: "Devpost", icon: "/images/stack/devpost.svg" },
    { name: "AWS", icon: "/images/stack/aws.svg" },
    { name: "Ubuntu", icon: "/images/stack/ubuntu.svg" },
  ];

  return (
    <div className="flex w-full flex-row items-start justify-between">
      <div className="order-2 flex items-start gap-4 md:order-1 md:w-1/2">
        <div className="grid grid-rows-4 gap-4">
          {stacks.map((stack, i) => (
            <StackView key={i} order={i} {...stack} />
          ))}
        </div>
        <div className="flex flex-col gap-1 xl:gap-1.5">
          {technology.map((tech, i) => (
            <Technology key={i} order={i} {...tech} />
          ))}
        </div>
      </div>
      <Banner src="3" alt="Stack" />
    </div>
  );
}
