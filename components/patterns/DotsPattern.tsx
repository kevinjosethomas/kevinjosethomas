export default function DotsPattern() {
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const columns = 8;
  const rows = 16;

  const jitter = (seed: number, amplitude: number) =>
    (seededRandom(seed) - 0.5) * 2 * amplitude;

  const dots = Array.from({ length: columns * rows }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);

    const baseX = 36 + (column / (columns - 1)) * 58;
    const baseY = (row / (rows - 1)) * 100;

    const x = Math.max(28, Math.min(100, baseX + jitter(index * 1.73, 4)));
    const y = Math.max(0, Math.min(100, baseY + jitter(index * 2.41, 5)));

    const size = 7 + seededRandom(index * 5.19) * 6;

    return {
      id: index,
      x,
      y,
      size,
    };
  });

  return (
    <div className="relative h-[900px] w-[780px]">
      <div className="absolute inset-0">
        {dots.map((dot) => (
          <span
            key={dot.id}
            className="absolute rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: 0.15,
              backgroundColor: "rgba(142, 189, 255, 1)",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 55%)",
        }}
      />
    </div>
  );
}
