import moment from "moment";
import "moment-timezone";
import { useEffect, useState } from "react";

export default function Intro(props) {
  const [time, setTime] = useState(moment.tz(new Date(), "America/Vancouver"));

  useEffect(() => {
    setInterval(() => {
      setTime(moment.tz(new Date(), "America/Vancouver"));
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-start justify-start w-screen h-screen p-5 bg-black">
      <div className="flex flex-row items-center justify-start space-x-2">
        <i className="fal fa-clock text-xl text-white" />
        <p className="text-xl text-white text-opacity-90">
          {time.format("MMMM Do YYYY")} • {time.format("hh:mm:ss a")}
        </p>
      </div>
    </div>
  );
}
