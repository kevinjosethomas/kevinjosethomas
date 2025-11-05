export default function Home() {
  return (
    <div className="flex w-full flex-col items-start justify-start">
      <div className="relative flex h-[708px] w-full flex-col items-start justify-center p-24">
        <div className="flex max-w-sm flex-col items-start justify-start gap-6">
          <p className="font-micro5 text-4xl">hey!</p>
          <p className="text-xl">
            Currently, I lead engineering for the Maia Chess project— the
            world&apos;s first most popular chess bot.
          </p>
          <p className="text-xl">
            Previously, I was a SWE intern at K-Scale Labs (YC24) in Palo Alto.
            Studying CS at UWaterloo.
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
    </div>
  );
}
