import AnimatedCursor from "react-animated-cursor";
import { AnimateSharedLayout } from "framer-motion";

import "ui/styles/custom.css";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  return (
    <AnimateSharedLayout>
      <Component {...pageProps} />
      <AnimatedCursor
        innerSize={4}
        outerSize={32}
        color="147, 197, 253"
        outerAlpha={0.2}
        innerScale={1}
        outerScale={1.5}
      />
    </AnimateSharedLayout>
  );
}
