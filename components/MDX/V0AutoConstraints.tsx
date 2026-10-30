type Constraint = {
  label: string;
  detail: string;
  Icon: ({ className }: { className?: string }) => React.ReactElement;
};

// SVG paths copied from Heroicons 24px outline (heroicons.com).
function ArrowsPointingInIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
    </svg>
  );
}

function ViewfinderCircleIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function CodeBracketIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  );
}

function ScaleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
    </svg>
  );
}

const constraints: Constraint[] = [
  {
    label: "Small",
    detail: "Big models add latency and bundle weight.",
    Icon: ArrowsPointingInIcon,
  },
  {
    label: "Accurate",
    detail: "A weak router worsens model selection.",
    Icon: ViewfinderCircleIcon,
  },
  {
    label: "Simple",
    detail: "External inference adds a service boundary.",
    Icon: CodeBracketIcon,
  },
];

// Per-bar animation class. The keyframes (in globals.css) push one bar up while
// the other two drop, so the three levels always trade off against each other.
const barAnim = ["constraint-bar-a", "constraint-bar-b", "constraint-bar-c"];

export function V0AutoConstraints() {
  return (
    <section className="my-8 py-7">
      <div className="mb-6 flex items-center gap-2 text-sm font-medium text-white">
        <ScaleIcon />
        <span>Design Constraints</span>
      </div>

      <div className="md:grid md:grid-cols-2 md:items-center md:gap-10">
        {/* Left half: a three-band meter. Pushing one constraint higher pulls the
            other two down — there is no setting where all three peak at once. */}
        <div className="flex items-end justify-center gap-7 md:pt-8">
          {constraints.map(({ label, Icon }, i) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div className="relative h-28 w-2.5 overflow-hidden rounded-full bg-white/10">
                <span
                  className={`constraint-bar ${barAnim[i]} absolute inset-x-0 bottom-0 rounded-full bg-white`}
                />
              </div>
              <span className="flex items-center gap-1.5 text-sm font-medium text-white">
                <Icon className="h-4 w-4 text-white/70" />
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Right half: why the three constraints are hard to satisfy together. */}
        <p className="text-secondary mt-6 text-sm font-light leading-relaxed md:mt-0">
          A bigger model was more accurate but too slow. A tiny inline one stayed
          small and simple but missed hard prompts. Anything accurate enough
          wanted its own service.
        </p>
      </div>
    </section>
  );
}
