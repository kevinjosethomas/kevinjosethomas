import type { ReactNode } from "react";
import Link from "next/link";

type HighlightProps = {
  children: ReactNode;
  href?: string;
};

const Highlight = ({ children, href }: HighlightProps) => {
  const classes = `group relative inline-flex items-center whitespace-nowrap rounded-sm px-0.5 py-0.5 text-white/80 transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none`;

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
      <span className="relative z-10 font-normal text-white">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <span className={classes}>{content}</span>;
};

export default Highlight;
