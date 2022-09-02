import "moment-timezone";
import axios from "axios";
import moment from "moment";
import Head from "next/head";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";

import Default from "ui/layouts/Default";

export default function Home(props) {
  const [time, setTime] = useState(moment.tz(new Date(), "America/Vancouver"));

  useEffect(() => {
    const refreshTime = setInterval(() => {
      setTime(moment.tz(new Date(), "America/Vancouver"));
    }, 1000);

    return () => {
      clearInterval(refreshTime);
    };
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Kevin Thomas</title>
        <meta name="title" content="Kevin Thomas" />
        <meta property="og:title" content="Kevin Thomas" />
        <meta property="twitter:title" content="Kevin Thomas" />
      </Head>
      <Default>
        <div className="flex w-full flex-col items-start justify-start space-y-3 md:space-y-6">
          <div className="flex w-full flex-col items-start justify-start space-y-3 md:space-y-6">
            <motion.div
              className="flex items-center space-x-4 text-3xl font-bold tracking-[-0.02rem] text-white text-opacity-80 md:text-5xl"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <p>Hey</p>
              <img src="/icons/wave.svg" className="h-[48px] select-none" draggable="false" />
              <p>I'm Kevin</p>
            </motion.div>
            <div className="flex w-full max-w-2xl flex-col items-start justify-start space-y-3 md:space-y-4">
              <motion.p
                className="text-lg text-white text-opacity-70 md:text-xl"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                I'm a 15 year old student and full-stack developer. I've spent over 3 years learning
                various programming languages and practicing new technology.
              </motion.p>
              <motion.p
                className="text-lg text-white text-opacity-70 md:text-xl"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                Over the last three years, I've gained a strong expertise in Python, Javascript,
                PostgreSQL and React. I've worked on dozens of projects ranging from websites and
                APIs to mobile apps and Discord bots.
              </motion.p>
              <motion.p
                className="text-lg text-white text-opacity-70 md:text-xl"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                Right now, I spend most of my time in high school and preparing for university. Most
                of my development time goes into my own projects, freelance work and hackathons. I'm
                hoping to get into developing accessibility software, especially for the Deaf
                community.
              </motion.p>
            </div>
          </div>
          <motion.div
            className="flex flex-col items-start justify-start space-y-1.5"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.4 }}
          >
            <div className="flex flex-row items-center justify-start space-x-2">
              <i className="fas fa-map-marker-alt w-[25px] text-center text-lg text-white text-opacity-90 md:text-xl" />
              <p className="text-lg text-white text-opacity-90 md:text-xl">Vancouver, Canada</p>
            </div>
            <div className="flex flex-row items-center justify-start space-x-2">
              <i className="fas fa-clouds w-[25px] text-center text-lg text-white text-opacity-90 md:text-xl" />
              <p className="text-lg text-white text-opacity-90 md:text-xl">
                Feels like {Math.ceil(props.weather.main.feels_like)}°C (
                {props.weather.weather[0].main})
              </p>
            </div>
            <div className="flex flex-row items-center justify-start space-x-2">
              <i className="fas fa-clock w-[25px] text-center text-lg text-white text-opacity-90 md:text-xl" />
              <p className="text-lg text-white text-opacity-90 md:text-xl">
                {time.format("MMMM Do YYYY")} • {time.format("h:mm:ss a")}
              </p>
            </div>
          </motion.div>
        </div>
      </Default>
    </Fragment>
  );
}

export async function getServerSideProps(ctx) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${process.env.OPENWEATHER_LOCATION}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
  );

  return {
    props: {
      weather: response.data,
    },
  };
}
