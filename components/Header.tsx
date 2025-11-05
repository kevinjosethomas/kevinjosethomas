"use client";

import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="flex w-full items-center justify-between px-6 py-4 md:py-12 lg:px-0">
        <div className="flex items-center justify-start gap-6">
          <h1 className="text-2xl font-bold md:text-3xl">kevin thomas</h1>
          <p className="text-secondary hidden text-xl md:block">projects</p>
          <p className="text-secondary hidden text-xl md:block">writing</p>
        </div>

        <div className="hidden items-center justify-start gap-6 md:flex">
          <Image src="/icons/x.svg" alt="X" width={20} height={20} />
          <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} />
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-0">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="border-border flex w-full items-center justify-center border-t border-b py-12 text-3xl font-semibold tracking-wide transition-colors hover:bg-white/5"
          >
            projects
          </button>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="border-border flex w-full items-center justify-center border-b py-12 text-3xl font-semibold tracking-wide transition-colors hover:bg-white/5"
          >
            writing
          </button>

          <div className="border-border mt-8 flex w-full items-center justify-center gap-12 border-t border-b py-10">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="transition-opacity hover:opacity-70"
            >
              <Image src="/icons/x.svg" alt="X" width={24} height={24} />
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/icons/github.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
