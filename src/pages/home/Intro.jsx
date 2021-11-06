import "moment-timezone";

import { useAnimation } from "framer-motion";
import { Fragment, useEffect, useState } from "react";

import Cursor from "./Cursor";
import Terminal from "./Terminal";

export default function Introduction(props) {
  const controls = useAnimation();

  const [animated, setAnimated] = useState(false);
  const [terminal, setTerminal] = useState(true);
  const [closingTerminal, setClosingTerminal] = useState(false);
  const [beforeClosingTerminal, setBeforeClosingTerminal] = useState(false);

  const close = () => {
    if (!animated) {
      setTimeout(() => {
        // Wait 500ms before scaling terminal down

        controls.start({
          scale: 0.65,
          transition: { duration: 0.2 },
        });

        setAnimated(true);
        document.removeEventListener("click", close);
        document.removeEventListener("keydown", close);

        setTimeout(() => {
          // Wait 1000ms before the cursor appears
          setBeforeClosingTerminal(true);

          setTimeout(() => {
            // Wait 750ms before the cursor appears on the X icon
            setClosingTerminal(true);

            setTimeout(() => {
              // Wait 1000ms before closing the terminal
              setBeforeClosingTerminal(false);
              setClosingTerminal(false);
              setTerminal(false);
            }, 1000);
            //
          }, 750);
          //
        }, 1000);
        //
      }, 500);
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

  return (
    <Fragment>
      {animated && <Window />}
      {terminal && (
        <Terminal
          animated={animated}
          controls={controls}
          closing={closingTerminal}
          weather={props.weather}
        />
      )}
      {beforeClosingTerminal && <Cursor />}
    </Fragment>
  );
}

function Window() {
  return (
    <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-screen h-screen">
      <video playsInline autoPlay muted loop poster="bg.png" className="w-screen h-screen">
        <source src="bg.mp4" type="video/mp4" />
      </video>
      <div className="taskbar absolute bottom-0 left-0 flex flex-row items-center justify-center w-full h-[48px]"></div>
    </div>
  );
}
