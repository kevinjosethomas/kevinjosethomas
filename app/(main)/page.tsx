import Link from "next/link";

const linkClasses =
  "underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 transition-all hover:decoration-neutral-900 dark:hover:decoration-neutral-100";

export default function Home() {
  return (
    <section>
      <h1 className="title mb-8 text-2xl font-semibold tracking-tighter">
        kevin thomas
      </h1>
      <p className="mb-4">
        I study CS at the University of Waterloo. Currently, I’m a
        Member of Technical Staff at{" "}
        <Link href="/work/prime-intellect" className={linkClasses}>
          Prime Intellect
        </Link>{" "}
        in San Francisco. Previously:{" "}
        <Link href="/work/vercel" className={linkClasses}>
          Vercel
        </Link>
        ,{" "}
        <Link href="/work/kscale" className={linkClasses}>
          K-Scale Labs
        </Link>
        ,{" "}
        <Link href="/work/csslab" className={linkClasses}>
          Maia Chess
        </Link>
        .
      </p>
    </section>
  );
}
