import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-[48px] w-full overflow-hidden">
      <div className="relative aspect-[4/1] w-full overflow-hidden">
        <Image
          src="/inference-header.svg"
          alt=""
          fill
          unoptimized
          draggable={false}
          className="object-cover object-center select-none"
        />
      </div>
    </footer>
  );
}
