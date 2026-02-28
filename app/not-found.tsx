import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="mt-4 text-lg text-white/60">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-6 text-sm text-white/60 transition hover:text-white/80"
      >
        Go back home
      </Link>
    </div>
  );
}
