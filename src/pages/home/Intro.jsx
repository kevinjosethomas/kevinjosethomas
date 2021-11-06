import "moment-timezone";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

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
      <div className="flex flex-col items-start justify-start space-y-2">
        <div className="flex flex-row items-center justify-start space-x-4">
          <i className="fal fa-clock text-xl text-white" />
          <p className="text-xl text-white text-opacity-90">
            {time.format("MMMM Do YYYY")} • {time.format("hh:mm:ss a")}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start space-y-1">
        <p className="text-xl text-white text-opacity-90">
          Welcome to my portfolio v2.1.0 (@trustedmercury/latest)
        </p>
        <div className="flex flex-col items-start justify-start">
          <p className="text-xl text-white text-opacity-90">* Discord: https://dsc.gg/tm</p>
          <p className="text-xl text-white text-opacity-90">
            * GitHub: https://github.com/trustedmercury
          </p>
          <p className="text-xl text-white text-opacity-90">
            * Twitter: https://twitter.com/trustedmercury
          </p>
        </div>
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
