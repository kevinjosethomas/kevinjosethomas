import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-secondary text-lg">This page could not be found.</p>
      <Link
        href="/"
        className="text-secondary hover:text-white transition-colors underline underline-offset-4"
      >
        Return home
      </Link>
    </div>
  );
}
