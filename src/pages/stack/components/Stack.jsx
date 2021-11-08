import Technology from "./Technology";

export default function Stack(props) {
  const stack = [
    {
      icon: "python.svg",
      color: "bg-[#DFBA39]",
      name: "Python",
      for: "my go-to language for basic scripts, Discord bots, scrapers & libraries",
    },
    {
      icon: "typescript.svg",
      color: "bg-[#3178C6]",
      name: "TypeScript",
      for: "type my frontend applications (next/react) & APIs (express/fastify)",
    },
    {
      icon: "postgresql.svg",
      color: "bg-[#4169E1]",
      name: "PostgreSQL",
      for: "my go-to SQL database software, with asyncpg (python) & pg (node)",
    },
    {
      icon: "nextjs.svg",
      color: "bg-[#202020]",
      name: "NextJS",
      for: "my go-to frontend framework, used for all my web applications so far",
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-col items-start justify-start w-full">
        <h1 className="font-bold text-4xl text-white text-opacity-80 tracking-[-0.02rem]">
          💻 Stack
        </h1>
        <p className="text-lg text-white text-opacity-60">
          My preferred stack of technologies for any web, mobile, desktop or discord projects right
          now. (w/ electron and react native)
        </p>
      </div>
      <div className="flex flex-col items-start justify-start w-full space-y-2">
        {stack.map((tech, index) => (
          <Technology key={index} index={index} {...tech} />
        ))}
      </div>
    </div>
  );
}
