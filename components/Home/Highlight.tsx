import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type HighlightProps = {
  children: ReactNode;
  icon?: string;
  href?: string;
  rotate?: number;
};

const Highlight = ({ children, icon, href, rotate = 0 }: HighlightProps) => {
  const classes = `group inline text-white/80 transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none`;

  const content = (
    <span
      className={`relative inline-flex items-baseline gap-1.5 [box-decoration-break:clone] px-0.5 py-0.5 font-normal whitespace-nowrap text-white decoration-white decoration-1 underline-offset-4 transition-all duration-300 [-webkit-box-decoration-break:clone] hover:bg-white/2 focus-visible:bg-white/2 focus-visible:underline ${href && "hover:underline"}`}
    >
      {icon && (
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          className="highlight-icon relative z-10 h-4 w-4 shrink-0 self-center object-contain"
          style={
            {
              "--highlight-icon-rotate": rotate === 1 ? "12deg" : "-12deg",
            } as CSSProperties
          }
        />
      )}
      <span>{children}</span>
    </span>
  );

  if (href) {
    const isExternal = typeof href === "string" && !href.startsWith("/");

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <span className={classes}>{content}</span>;
};

export default Highlight;
