import "moment-timezone";
import axios from "axios";
import moment from "moment";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";

import Intro from "./index/Intro";
import Default from "ui/layouts/Default";

export default function Home(props) {
  const [initialized, setInitialized] = useState(true);
  const [time, setTime] = useState(moment.tz(new Date(), "America/Vancouver"));

  useEffect(() => {
    setInitialized(localStorage.getItem("intro") === "true");
  });

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
      {!initialized && <Intro weather={props.weather} setIntro={setInitialized} />}
      {initialized && (
        <Default>
          <div className="flex flex-col items-start justify-start w-full space-y-6">
            <div className="flex flex-col items-start justify-start w-full space-y-6">
              <motion.h1
                className="font-bold text-5xl text-white text-opacity-80 tracking-[-0.02rem]"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                Hey! 👋 I'm Kevin.
              </motion.h1>
              <div className="flex flex-col items-start justify-start w-full space-y-4 max-w-2xl">
                <motion.p
                  className="text-xl text-white text-opacity-70"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  I'm Kevin Thomas, a 14 year old student, full-stack developer and an aspiring tech
                  entrepreneur. I have over 2 years of experience in the development world and I
                  spend most of my time learning and practicing new technology.
                </motion.p>
                <motion.p
                  className="text-xl text-white text-opacity-70"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  Over the last two years, I've gained expertise in Python, JavaScript, PostgreSQL
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
                  {time.format("MMMM Do YYYY")} • {time.format("hh:mm:ss a")}
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
