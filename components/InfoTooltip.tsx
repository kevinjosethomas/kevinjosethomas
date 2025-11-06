type InfoTooltipProps = {
  content: string;
};

export default function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <span className="group relative inline-flex">
      <button
        tabIndex={0}
        className="text-secondary flex h-5 w-5 cursor-help items-center justify-center rounded-full transition-colors group-focus-within:text-white/80 group-hover:text-white/80 focus:outline-none"
        aria-label="More information"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>
      <span className="absolute bottom-full left-1/2 z-50 hidden -translate-x-1/2 pb-2 group-focus-within:block group-hover:block group-focus-visible:block group-active:block">
        <span className="border-border text-secondary block w-72 rounded border bg-black px-3 py-2 text-left text-xs leading-relaxed shadow-lg">
          {content}
        </span>
      </span>
    </span>
  );
}

