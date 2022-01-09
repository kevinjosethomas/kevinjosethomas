import "moment-timezone";
import axios from "axios";
import moment from "moment";
import Head from "next/head";
import twemoji from "twemoji";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";

import Intro from "./index/Intro";
import Default from "ui/layouts/Default";

export default function Home(props) {
  const [initialized, setInitialized] = useState(true);
  const [time, setTime] = useState(moment.tz(new Date(), "America/Vancouver"));

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setInitialized(true);
      return;
    }
    setInitialized(localStorage.getItem("intro") === "true");
  }, []);

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
      {!initialized && <Intro weather={props.weather} setIntro={setInitialized} />}
      {initialized && (
        <Default>
          <div className="flex flex-col items-start justify-start w-full space-y-3 md:space-y-6">
            <div className="flex flex-col items-start justify-start w-full space-y-3 md:space-y-6">
              <motion.div
                className="flex items-center space-x-4 font-bold text-3xl md:text-5xl text-white text-opacity-80 tracking-[-0.02rem]"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <p>Hey!</p>
                <img src="/icons/wave.svg" className="h-[48px] select-none" draggable="false" />
                <p>I'm Kevin.</p>
              </motion.div>
              <div className="flex flex-col items-start justify-start w-full space-y-3 md:space-y-4 max-w-2xl">
                <motion.p
                  className="text-lg md:text-xl text-white text-opacity-70"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  I'm Kevin Thomas, a 14 year old student, full-stack developer and an aspiring tech
                  entrepreneur. I have over 2 years of experience in the development world and I
                  spend most of my time learning and practicing new technology.
                </motion.p>
                <motion.p
                  className="text-lg md:text-xl text-white text-opacity-70"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  Over the last two years, I've gained expertise in Python, TypeScript, PostgreSQL
                  and React. I've worked on dozens of projects including REST APIs, websites,
                  Discord bots and mobile apps. I'm currently focusing on participating in developer
                  events, creating accessible technology and contributing to opensource software!
                </motion.p>
              </div>
            </div>
            <motion.div
              className="flex flex-col items-start justify-start space-y-1"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.3 }}
            >
              <div className="flex flex-row items-center justify-start space-x-2">
                <i className="fas fa-map-marker-alt w-[22.5px] text-center text-lg text-white text-opacity-90" />
                <p className="text-lg text-white text-opacity-90">Vancouver, Canada</p>
              </div>
              <div className="flex flex-row items-center justify-start space-x-2">
                <i className="fas fa-clouds w-[22.5px] text-center text-lg text-white text-opacity-90" />
                <p className="text-lg text-white text-opacity-90">
                  Feels like {Math.ceil(props.weather.main.feels_like)}°C (
                  {props.weather.weather[0].main})
                </p>
              </div>
              <div className="flex flex-row items-center justify-start space-x-2">
                <i className="fas fa-clock w-[22.5px] text-center text-lg text-white text-opacity-90" />
                <p className="text-lg text-white text-opacity-90">
                  {time.format("MMMM Do YYYY")} • {time.format("h:mm:ss a")}
                </p>
              </div>
            </motion.div>
          </div>
        </Default>
      )}
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
