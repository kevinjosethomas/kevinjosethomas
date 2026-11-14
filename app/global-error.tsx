"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en" className="dark">
      <body className="m-0 flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <main className="text-center">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-4 text-white/60">Please try loading this page again.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 text-sm text-white/60 underline hover:text-white/80"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
