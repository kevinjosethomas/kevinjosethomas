import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import Intro from "./index/Intro";
import Default from "ui/layouts/Default";

export default function Home(props) {
  const [initialized, setInitialized] = useState(true);

  useEffect(() => {
    setInitialized(localStorage.getItem("intro") === "true");
  });

  return (
    <Fragment>
      {!initialized && <Intro weather={props.weather} setIntro={setInitialized} />}
      {initialized && <Default></Default>}
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
