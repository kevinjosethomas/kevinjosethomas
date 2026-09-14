import Link from "next/link";

const linkClasses =
  "underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 transition-all hover:decoration-neutral-900 dark:hover:decoration-neutral-100";

export default function Home() {
  return (
    <section>
      <div className="max-w-prose space-y-4 leading-relaxed">
        <p>I study CS at the University of Waterloo.</p>
        <p>
          I’m currently a Member of Technical Staff at{" "}
          <Link href="/work/prime-intellect" className={linkClasses}>
            Prime Intellect
          </Link>{" "}
          in San Francisco, building Prime Agent, an open-source,
          self-improving agent harness for coding and research. Previously, I
          was an engineering intern at{" "}
          <Link href="/work/vercel" className={linkClasses}>
            Vercel
          </Link>{" "}
          and{" "}
          <Link href="/work/kscale" className={linkClasses}>
            K-Scale Labs
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
