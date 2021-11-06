import { useState } from "react";

import Intro from "./home/Intro";

export default function Home(props) {
  const [initialized, setInitialized] = useState(false);

  if (initialized) {
    return <Intro />;
  }

  return <div className="flex flex-col items-start justify-start w-screen h-screen"></div>;
}
