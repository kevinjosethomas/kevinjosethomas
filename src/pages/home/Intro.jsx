import "moment-timezone";
import moment from "moment";
import Typist from "react-typist";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import Link from "./Link";

export default function Introduction(props) {
  const controls = useAnimation();

  const [animated, setAnimated] = useState(false);
  const [time, setTime] = useState(moment.tz(new Date(), "America/Vancouver"));

  const close = () => {
    if (!animated) {
      controls.start({
        scale: 0.65,
        transition: { duration: 0.2 },
      });
      setAnimated(true);
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    }
  };

  useEffect(() => {
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);

    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
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
    <motion.div
      className={`flex flex-col items-start justify-start w-screen h-screen ${
        animated && "select-none rounded-xl overflow-hidden border-2 border-blue-300"
      }`}
      animate={controls}
    >
      <Titlebar />
      <div className="flex flex-col items-start justify-start w-full h-full p-10 bg-[#0C0C0C] space-y-3">
        <Dynamic time={time} weather={props.weather} />
        <div className="flex flex-col items-start justify-start space-y-1">
          <Intro />
          <Socials />
        </div>
        <Continue />
      </div>
    </motion.div>
  );
}

function Titlebar() {
  return (
    <div className="flex flex-row items-center justify-between w-full bg-[#2D2D2D]">
      <div className="flex flex-row items-end justify-start h-12 pl-4">
        <div className="relative tab flex flex-row items-center justify-start h-10 px-4 space-x-32 bg-[#0C0C0C] rounded-t-md">
          <div className="flex flex-row items-center justify-start space-x-2">
            <i className="fab fa-ubuntu text-sm text-blue-300" />
            <p className="text-sm text-white tracking-wider">Ubuntu</p>
          </div>
          <div className="flex flex-row items-center justify-center w-5 h-5 hover:bg-white hover:bg-opacity-10 rounded-sm">
            <i className="fal fa-times text-sm text-white" />
          </div>
        </div>
      </div>
      <ActionBar />
    </div>
  );
}

function ActionBar(props) {
  return (
    <div className="flex flex-row items-center justify-start">
      <div className="flex flex-row items-center justify-center w-12 h-12 hover:bg-white hover:bg-opacity-10">
        <i className="fal fa-window-minimize text-sm text-white" />
      </div>
      <div className="flex flex-row items-center justify-center w-12 h-12 hover:bg-white hover:bg-opacity-10">
        <i className="fal fa-square-full text-sm text-white" />
      </div>
      <div className="flex flex-row items-center justify-center w-12 h-12 hover:bg-[#D30F20]">
        <i className="fal fa-times text-sm text-white" />
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

function Continue() {
  return (
    <motion.div
      className="flex flex-row items-center justify-start"
      initial={{ display: "none" }}
      animate={{ display: "flex" }}
      transition={{ delay: 5 }}
    >
      <p className="flex flex-row items-center justify-start space-x-1 text-xl text-white text-opacity-90">
        <span className="text-blue-300">kevin@ubuntu</span>:~$ Press any key to continue.
        <Typist cursor={{ show: true, blink: true }} />
      </p>
    </motion.div>
  );
}
