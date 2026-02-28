import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="mt-4 text-lg text-neutral-400">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        Go back home
      </Link>
    </div>
  );
}
