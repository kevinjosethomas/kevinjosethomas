import Image from "next/image";

export default function Home() {
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
      <div className="border-border grid grid-cols-2 border-b">
        <div className="relative">
          <Image
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
      <div className="border-border flex w-full flex-row items-start justify-between">
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
                <p>Reflecting on Scrapyard— What We Did in Austin TX and..</p>
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
    </div>
  );
}
