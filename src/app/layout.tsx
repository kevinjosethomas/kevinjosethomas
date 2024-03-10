import Script from "next/script";
import type { Metadata } from "next";
import { Karla } from "next/font/google";

import "@/ui/styles/tailwind.css";
import Navbar from "@/ui/components/Navbar/Navbar";

const font = Karla({ subsets: ["latin"] });

const identity = {
  title: "Kevin Thomas",
  description:
    "Hey! I'm Kevin Thomas, a high school junior from Vancouver with a passion for computer science and software development.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="relative m-4 grid h-full min-h-screen overflow-hidden bg-black pt-40 md:m-0 md:pt-0 4xl:items-start 4xl:justify-center 4xl:py-48">
          <div className="flex w-full max-w-[calc(100vw-2rem)] flex-col items-start gap-4 md:max-w-[100vw] md:px-36 md:py-24 2xl:max-w-screen-2xl 2xl:gap-8 3xl:max-w-[1920px] 4xl:py-0">
            <Navbar />
            {children}
          </div>
        </div>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-9QYTSWW7WK" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9QYTSWW7WK');
          `}
        </Script>
      </body>
    </html>
  );
}
