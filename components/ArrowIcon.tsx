interface ArrowIconProps {
  className?: string;
}

export default function ArrowIcon({ className = "h-4 w-4" }: ArrowIconProps) {
  return (
    <svg
      className={`transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 2.5h9v9M13 3L3 13"
      />
    </svg>
  );
}


