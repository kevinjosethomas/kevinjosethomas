type TooltipProps = {
  content: string;
  number: number;
};

export default function Tooltip({ content, number }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      <sup
        tabIndex={0}
        className="text-secondary cursor-help text-xs transition-colors group-focus-within:text-white/80 group-hover:text-white/80 focus:outline-none"
      >
        {number}
      </sup>
      <span className="absolute top-full left-1/2 z-50 hidden -translate-x-1/2 pt-2 group-focus-within:block group-hover:block group-focus-visible:block group-active:block">
        <span className="border-border text-secondary block w-72 rounded border bg-black px-3 py-2 text-left text-xs leading-relaxed shadow-lg">
          {content}
        </span>
      </span>
    </span>
  );
}
