import { AnimateSharedLayout } from "framer-motion";

import "ui/styles/custom.css";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  return (
    <AnimateSharedLayout>
      <Component {...pageProps} />
    </AnimateSharedLayout>
  );
}
