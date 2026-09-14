import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Common/Footer";

const linkClasses = "opacity-90 transition-opacity hover:opacity-100";

function Company({
  href,
  icon,
  children,
  iconClassName = "h-3.5 w-3.5",
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
  iconClassName?: string;
}) {
  return (
    <Link href={href} prefetch={true} className={`${linkClasses} px-0.5`}>
      <Image
        src={icon}
        alt=""
        width={14}
        height={14}
        className={`mr-1 inline ${iconClassName} align-[-1px] object-contain`}
      />
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <>
    <section>
      <div className="max-w-[55ch] space-y-[25.2px] leading-[1.625] tracking-[0.03em] text-white/85">
        <p>I study CS at the University of Waterloo.</p>
        <p>
          Currently, I’m a Member of Technical Staff at{" "}
          <Company
            href="/work/prime-intellect"
            icon="/icons/prime-intellect.webp"
          >
            Prime Intellect
          </Company>
          , where I lead{" "}
          <a
            href="https://github.com/PrimeIntellect-ai/prime-agent"
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClasses} px-0.5`}
          >
            Prime Agent
          </a>
          , our open-source harness for coding and research.
        </p>
        <p>
          Previously, I was an Engineering Intern on the v0 team at{" "}
          <Company
            href="/work/vercel"
            icon="/icons/vercel-white.svg"
            iconClassName="h-3 w-3"
          >
            Vercel
          </Company>
          . I also interned at{" "}
          <Company href="/work/kscale" icon="/icons/kscale.svg">
            K-Scale Labs
          </Company>
          , building the software stack for open-source humanoid robots.
        </p>
      </div>
    </section>
      <Footer />
    </>
  );
}
