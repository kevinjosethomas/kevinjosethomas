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
    <span className="relative inline-flex items-center gap-2 [box-decoration-break:clone] px-0.5 py-0.5 font-normal text-white transition-all duration-300 [-webkit-box-decoration-break:clone] hover:bg-[#C84516]/20 hover:shadow-[0_2px_0_0_rgb(200,69,22,0.6)] focus-visible:bg-[#C84516]/20 focus-visible:shadow-[0_2px_0_0_rgb(200,69,22,0.6)]">
      {icon && (
        <span
          className="highlight-icon relative z-10 flex h-4 w-4 shrink-0 items-center justify-center"
          style={
            {
              "--highlight-icon-rotate": rotate === 1 ? "12deg" : "-12deg",
            } as CSSProperties
          }
        >
          <Image
            src={icon}
            alt=""
            width={24}
            height={24}
            className="relative z-10"
          />
        </span>
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
