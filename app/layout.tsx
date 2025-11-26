import "./globals.css";
import type { Metadata } from "next";
import { Karla } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostHogClient from "@/lib/posthog";
import { Analytics } from "@vercel/analytics/next";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const identity = {
  title: "Kevin Thomas",
  description:
    "I'm a Computer Science student at the University of Waterloo. Currently, I lead engineering for the Maia Chess project— the world's most popular chess bot. Previously, I was a SWE intern at K-Scale Labs in Palo Alto. I also worked on  neural sign language translation, and organized for Hack Club.",
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
    <html lang="en">
      <body className={`${karla.variable} bg-black antialiased`}>
        <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col items-center">
          <Header />
          <main className="border-border w-full border">{children}</main>
          <Footer />
        </div>
      </body>
      <Analytics />
    </html>
  );
}
