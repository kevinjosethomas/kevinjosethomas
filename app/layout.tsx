import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import PostHogClient from "@/lib/posthog";
import { Analytics } from "@vercel/analytics/next";
import CommandPalette from "@/components/Common/CommandPalette";

// The pixel barrel initializes all five variants; this site only uses Square.
const GeistPixelSquare = localFont({
  src: "../node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2",
  variable: "--font-geist-pixel-square",
  weight: "500",
  fallback: [
    "Geist Mono",
    "ui-monospace",
    "SFMono-Regular",
    "Roboto Mono",
    "Menlo",
    "Monaco",
    "Liberation Mono",
    "DejaVu Sans Mono",
    "Courier New",
    "monospace",
  ],
  adjustFontFallback: false,
});

const identity = {
  title: "Kevin Thomas",
  description:
    "I study Computer Science at the University of Waterloo. Currently, I'm a Member of Technical Staff at Prime Intellect in San Francisco. Previously, I was an engineering intern at Vercel and K-Scale Labs. I also worked on neural sign language translation, and organized for Hack Club.",
};

export const metadata: Metadata = {
  ...identity,
  openGraph: {
    ...identity,
    url: "https://kevinjosethomas.com",
    siteName: "Kevin Thomas",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    ...identity,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posthog = PostHogClient();
  await posthog.shutdown();

  return (
    <html
      lang="en"
      className={`dark bg-black text-white ${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
    >
      <body className="antialiased">
        {children}
        <CommandPalette />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
