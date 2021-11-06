import axios from "axios";
import { useState } from "react";

import Intro from "./home/Intro";

export default function Home(props) {
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    return <Intro weather={props.weather} setIntro={setInitialized} />;
  }

  return <div className="flex flex-col items-start justify-start w-screen h-screen"></div>;
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
