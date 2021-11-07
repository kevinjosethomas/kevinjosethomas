import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import Intro from "./index/Intro";

export default function Home(props) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(localStorage.getItem("intro") === "true");
  });

  return (
    <Fragment>
      {!initialized && <Intro weather={props.weather} setIntro={setInitialized} />}
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
