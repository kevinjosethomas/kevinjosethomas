import Head from "next/head";
import { motion } from "framer-motion";

import { DefaultLayout } from "../layouts/DefaultLayout";

const Home = (props) => {
  return (
    <DefaultLayout>
      <Head>
        <meta name="description" content="ReactJS and NextJS frontend template for my projects, maybe you could use it too!" />
        <meta name="author" content="TrustedMercury" />

        <meta name="title" content="React Next Template" />
        <meta property="og:title" content="React Next Template" />
        <meta property="og:description" content="ReactJS and NextJS frontend template for my projects, maybe you could use it too!" />
        <meta property="twitter:title" content="React Next Template" />
        <meta property="twitter:description" content="ReactJS and NextJS frontend template for my projects, maybe you could use it too!" />
      </Head>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <motion.span
          className="text-5xl md:text-8xl text-gray-300 font-semibold font-inter"
          initial="initial"
          animate="enter"
          variants={{
            initial: { y: 20, opacity: 0 },
            enter: { y: 0, opacity: 1, transition: { duration: 0.5 } }
          }}
        >
          React + Next
        </motion.span>
        <motion.span
          className="text-lg md:text-3xl text-gray-400 max-w-xs md:max-w-full"
          initial="initial"
          animate="enter"
          variants={{
            initial: { y: 20, opacity: 0 },
            enter: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.1 } }
          }}
        >
          with TailwindCSS, Framer Motion and other cool stuff
        </motion.span>
      </div>
    </DefaultLayout>
  )
}

export default Home;
