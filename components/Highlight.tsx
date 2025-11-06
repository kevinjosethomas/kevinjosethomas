import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type HighlightProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  icon?: string;
  rotate?: number;
};

const Highlight = ({
  children,
  className = "",
  href,
  icon,
  rotate = 1,
}: HighlightProps) => {
  const sharedClasses = `group relative inline-flex items-center whitespace-nowrap rounded-sm px-0.5 py-0.5 text-white/80 transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none ${icon ? "gap-1" : ""} ${className}`;

  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-sm bg-[#C84516] opacity-0 transition-opacity duration-300 group-hover:opacity-20 group-focus-visible:opacity-20"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[0.15rem] bg-[#C84516] opacity-0 transition-opacity duration-300 group-hover:opacity-60 group-focus-visible:opacity-60"
      />
      {icon ? (
        <span className="relative z-10 h-3 w-3">
          <Image
            src={icon}
            alt=""
            width={12}
            height={12}
            className={`${rotate === 1 ? "rotate-12" : "-rotate-12"} relative z-10 transition-transform duration-200 group-hover:rotate-0`}
          />
        </span>
      ) : null}
      <span className="relative z-10 font-normal text-white">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className={sharedClasses}
      >
        {content}
      </Link>
    );
  }

  return <span className={sharedClasses}>{content}</span>;
};

export default Highlight;
