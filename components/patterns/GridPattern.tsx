import Image from "next/image";

export default function GridPattern() {
  return (
    <div className="relative grid grid-cols-4 gap-0">
      {Array.from({ length: 36 }).map((_, i) => (
        <div
          key={i}
          className="border-border box-border h-[118px] w-[118px] border"
        />
      ))}

      <div
        className="absolute z-10"
        style={{
          top: "118px",
          left: "0px",
          width: "236px",
          height: "236px",
        }}
      >
        <Image
          src="/experience/assets/head.png"
          alt="Head"
          width={236}
          height={236}
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className="absolute z-10"
        style={{
          top: "590px",
          left: "118px",
          width: "354px",
          height: "236px",
        }}
      >
        <Image
          src="/experience/assets/gaze.png"
          alt="Gaze"
          width={354}
          height={236}
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className="pointer-events-none absolute top-0 left-0 h-full w-1/2"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-full w-1/4"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
    </div>
  );
}

