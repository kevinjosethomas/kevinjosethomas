"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="flex w-full items-center justify-between px-6 py-4 md:py-8 lg:px-0">
        <div className="flex items-center justify-start gap-6">
          <Link href="/">
            <h1 className="text-2xl font-bold md:text-3xl">kevin thomas</h1>
          </Link>
          <Link href="/projects">
            <h3 className="text-secondary hidden text-xl md:block">projects</h3>
          </Link>
          <Link href="https://knowledge.kevinjosethomas.com" target="_blank">
            <h3 className="text-secondary hidden text-xl md:block">writing</h3>
          </Link>
        </div>

        <div className="hidden items-center justify-start gap-6 md:flex">
          <Link href="https://x.com/kevinjosethomas" target="_blank">
            <Image src="/icons/x.svg" alt="X" width={20} height={20} />
          </Link>
          <Link href="https://github.com/kevinjosethomas" target="_blank">
            <Image
              src="/icons/github.svg"
              alt="GitHub"
              width={20}
              height={20}
            />
          </Link>
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
        className={`fixed inset-0 z-40 bg-black px-16 transition-transform duration-100 md:hidden ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <nav className="flex h-full flex-col items-start justify-between py-16">
          <div className="flex flex-col items-start justify-start gap-4">
            <Link
              href="/"
              className="flex w-full items-start justify-start text-3xl font-semibold tracking-wide transition-colors hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              <h1 className="text-2xl font-bold md:text-3xl">kevin thomas</h1>
            </Link>
            <Link href="/projects" onClick={() => setIsMenuOpen(false)}>
              <h3 className="text-secondary text-xl md:block">projects</h3>
            </Link>
            <Link
              href="https://knowledge.kevinjosethomas.com"
              target="_blank"
              onClick={() => setIsMenuOpen(false)}
            >
              <h3 className="text-secondary text-xl md:block">writing</h3>
            </Link>
          </div>

          <div className="flex w-full items-center justify-center gap-8 py-10">
            <Link
              href="https://x.com/kevinjosethomas"
              target="_blank"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image src="/icons/x.svg" alt="X" width={24} height={24} />
            </Link>
            <Link
              href="https://github.com/kevinjosethomas"
              target="_blank"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/icons/github.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
