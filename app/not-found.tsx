import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-neutral-600 dark:text-neutral-400 text-lg">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="text-neutral-600 dark:text-neutral-400 underline underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        Return home
      </Link>
    </div>
  );
}
