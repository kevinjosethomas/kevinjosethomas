import Head from "next/head";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { AnimateSharedLayout } from "framer-motion";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

import "ui/styles/custom.css";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    new Audio("/sounds/boop.mp3").play().catch((e) => void 0);
  }, [router.pathname]);

  return (
    <AnimateSharedLayout>
      <Head>
        <meta
          name="keywords"
          content="kevin, thomas, kevin thomas, kevin jose thomas, kevin thomas codes, kevin codes, portfolio, kevin thomas portfolio, kevin thomas website"
        />
        <meta
          name="description"
          content="I'm Kevin Thomas, a 15 year old full-stack developer and an aspiring tech entrepreneur. Experienced in py, js, sql, react & more!"
        />

        <meta property="og:image" content="/embed.png" />
        <meta
          property="og:description"
          content="I'm Kevin Thomas, a 15 year old full-stack developer and an aspiring tech entrepreneur. Experienced in py, js, sql, react & more!"
        />

        <meta property="twitter:image" content="/embed.png" />
        <meta
          property="twitter:description"
          content="I'm Kevin Thomas, a 15 year old full-stack developer and an aspiring tech entrepreneur. Experienced in py, js, sql, react & more!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="kevinthomas.codes" />
        <meta property="og:url" content="https://kevinthomas.codes/" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="https://kevinthomas.codes/" />

        <link rel="shortcut icon" type="image/svg+xml" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      {/* <AnimatedCursor
        innerSize={4}
        outerSize={32}
        color="147, 197, 253"
        outerAlpha={0.2}
        innerScale={1}
        outerScale={1.5}
      /> */}
    </AnimateSharedLayout>
  );
}
