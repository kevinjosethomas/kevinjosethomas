import moment from "moment";
import "moment-timezone";
import { useEffect, useState } from "react";

export default function Intro(props) {
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      const pst = moment.tz(new Date(), "America/Vancouver");

      setTime(pst.format("hh:mm:ss a"));
    }, 1000);
  }, []);

  const lines = ["Current Time: ", "Welcome to Kevin Thomas v2 ()"];

  return (
    <div className="flex flex-col items-start justify-start w-screen h-screen bg-black">
      <span className="text-white">Current Time: {time}</span>
    </div>
  );
}
