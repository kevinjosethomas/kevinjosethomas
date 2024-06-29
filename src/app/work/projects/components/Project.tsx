import Image from "next/image";

export default function Project({
  name,
  image,
  children,
}: {
  name: string;
  image: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <Image
          src={`/images/projects/${image}`}
          alt={name}
          width={48}
          height={48}
        />
        <p className="text-4xl font-bold text-white">{name}</p>
      </div>
    </div>
  );
}
