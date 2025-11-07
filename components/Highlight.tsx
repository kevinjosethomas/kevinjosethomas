import type { ReactNode } from "react";
import Link from "next/link";

type HighlightProps = {
  children: ReactNode;
  href?: string;
};

const Highlight = ({ children, href }: HighlightProps) => {
  const classes = `group inline text-white/80 transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none`;

  const content = (
    <span className="relative inline [box-decoration-break:clone] px-0.5 py-0.5 font-normal text-white transition-all duration-300 [-webkit-box-decoration-break:clone] hover:bg-[#C84516]/20 hover:shadow-[0_2px_0_0_rgb(200,69,22,0.6)] focus-visible:bg-[#C84516]/20 focus-visible:shadow-[0_2px_0_0_rgb(200,69,22,0.6)]">
      {children}
    </span>
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
