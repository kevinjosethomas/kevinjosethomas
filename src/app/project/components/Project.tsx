import Link from "next/link";
import Image from "next/image";

export default function Project({
  name,
  image,
  banner,
  children,
}: {
  name: string;
  image: string;
  banner: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/work"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 transition duration-300 hover:bg-neutral-700"
      >
        <Image
          alt="Left Arrow"
          src="/icons/left-arrow.svg"
          width={16}
          height={16}
        />
      </Link>
      <div className="relative -z-20 h-[400px] w-[1024px] select-none overflow-hidden">
        <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-black"></div>
        <Image
          draggable={false}
          src={`/images/banners/${banner}`}
          alt={name}
          width={1024}
          height={400}
        />
      </div>
      <div className="z-50 -mt-24 flex items-center gap-3">
        <Image
          src={`/images/projects/${image}`}
          alt={name}
          width={48}
          height={48}
        />
        <p className="text-4xl font-bold text-white">{name}</p>
      </div>
      <div className="flex flex-col gap-4 text-xl font-light leading-relaxed text-white text-opacity-70">
        {children}
      </div>
    </div>
  );
}
