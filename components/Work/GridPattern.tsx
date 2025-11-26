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
