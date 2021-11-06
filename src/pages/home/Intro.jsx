import "moment-timezone";
import axios from "axios";
import moment from "moment";
import Typist from "react-typist";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Link from "./Link";

export default function Intro(props) {
  const [weather, setWeather] = useState();
  const [time, setTime] = useState(moment.tz(new Date(), "America/Vancouver"));

  useEffect(() => {
    (async () => {
      const [response, error] = await fetchWeather();

      if (error) {
        return;
      }

      setWeather(response);
    })();
  }, []);

  useEffect(() => {
    setInterval(() => {
      setTime(moment.tz(new Date(), "America/Vancouver"));
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-start justify-start w-screen h-screen p-10 space-y-3 bg-black">
      <div className="flex flex-col items-start justify-start space-y-1">
        <div className="flex flex-row items-center justify-start space-x-4">
          <i className="fal fa-clock w-[25px] text-xl text-blue-300 text-center" />
          <p className="text-xl text-white text-opacity-90">
            {time.format("MMMM Do YYYY")} • {time.format("hh:mm:ss a")}
          </p>
        </div>
        {weather && (
          <div className="flex flex-row items-center justify-start space-x-4">
            <i className="fal fa-clouds w-[25px] text-xl text-blue-300 text-center" />
            <p className="text-xl text-white text-opacity-90">
              Feels like {Math.ceil(weather.main.feels_like)}°C in Vancouver
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col items-start justify-start space-y-1">
        <Typist avgTypingDelay={35} stdTypingDelay={30} cursor={{ show: false }}>
          <p className="text-xl text-white text-opacity-90">
            Welcome to my portfolio v2.1.0 (
            <span className="text-blue-300">@trustedmercury/latest</span>)
          </p>
        </Typist>
        <motion.div
          className="flex flex-col items-start justify-start"
          initial={{ display: "none" }}
          animate={{ display: "flex" }}
          transition={{ delay: 3 }}
        >
          <Link label="Discord" link="https://dsc.gg/tm" />
          <Link label="GitHub" link="https://github.com/trustedmercury" />
          <Link label="Twitter" link="https://twitter.com/trustedmercury" />
        </motion.div>
      </div>
    </div>
  );
}

const fetchWeather = async () => {
  try {
    const response = await axios.get("/api/weather");

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};
