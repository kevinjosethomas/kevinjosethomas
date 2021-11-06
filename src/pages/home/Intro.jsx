import "moment-timezone";
import moment from "moment";
import Typist from "react-typist";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Link from "./Link";

export default function Introduction(props) {
  const [time, setTime] = useState(moment.tz(new Date(), "America/Vancouver"));

  useEffect(() => {
    setInterval(() => {
      setTime(moment.tz(new Date(), "America/Vancouver"));
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-start justify-start w-screen h-screen p-10 space-y-3 bg-black">
      <Dynamic time={time} weather={props.weather} />
      <div className="flex flex-col items-start justify-start space-y-1">
        <Intro />
        <Socials />
      </div>
    </div>
  );
}

function Dynamic(props) {
  return (
    <div className="flex flex-col items-start justify-start space-y-1">
      <div className="flex flex-row items-center justify-start space-x-4">
        <i className="fal fa-clock w-[25px] text-xl text-blue-300 text-center" />
        <p className="text-xl text-white text-opacity-90">
          {props.time.format("MMMM Do YYYY")} • {props.time.format("hh:mm:ss a")}
        </p>
      </div>
      <div className="flex flex-row items-center justify-start space-x-4">
        <i className="fal fa-clouds w-[25px] text-xl text-blue-300 text-center" />
        <p className="text-xl text-white text-opacity-90">
          Feels like{" "}
          <a
            href="https://openweathermap.org/city/6173331"
            target="_blank"
            className="hover:underline select-none delay-1000"
          >
            {Math.ceil(props.weather.main.feels_like)}°C
          </a>{" "}
          in Vancouver
        </p>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <Typist startDelay={500} avgTypingDelay={35} stdTypingDelay={30} cursor={{ show: false }}>
      <p className="text-xl text-white text-opacity-90">
        Welcome to my portfolio v2.1.0 <Typist.Delay ms={500} />(
        <span className="text-blue-300">@trustedmercury/latest</span>)
      </p>
    </Typist>
  );
}

function Socials() {
  return (
    <motion.div
      className="flex flex-col items-start justify-start"
      initial={{ display: "none" }}
      animate={{ display: "flex" }}
      transition={{ delay: 4 }}
    >
      <Link label="Discord" link="https://dsc.gg/tm" />
      <Link label="GitHub" link="https://github.com/trustedmercury" />
      <Link label="Twitter" link="https://twitter.com/trustedmercury" />
    </motion.div>
  );
}
