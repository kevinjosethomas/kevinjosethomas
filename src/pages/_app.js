import Head from "next/head";
import { Fragment } from "react";
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";

import "../styles/tailwind.css";

function App({ Component, pageProps, router }) {

  return (
    <Fragment>
      <Head>
        <title>Kevin Thomas</title>

        <link
          rel="shortcut icon"
          href="/favicon/favicon.ico"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/mbb5sux.css"
        />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.15.1/css/all.css"
        />
      </Head>
      <AnimateSharedLayout>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </AnimateSharedLayout>
    </Fragment>
  )

}

export default App;
