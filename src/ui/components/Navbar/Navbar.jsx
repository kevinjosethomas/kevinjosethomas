import { Fragment, useEffect, useState } from "react";

import Mobile from "./components/Mobile";
import Socials from "./components/Socials";
import Navigation from "./components/Navigation";

export default function Navbar(props) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobile]);

  return (
    <Fragment>
      <div className="hidden w-full flex-col items-start justify-start space-y-4 py-10 md:flex">
        <div className="flex w-full flex-row items-center justify-between">
          <Navigation />
          <Socials />
        </div>
        <div className="h-0.5 w-full bg-white bg-opacity-10" />
      </div>
      <div className="flex w-[90%] flex-col items-start justify-start space-y-4 py-5 md:hidden">
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-xl text-white text-opacity-70">Kevin Thomas</p>
          <i
            className="far fa-bars text-xl text-white text-opacity-70"
            onClick={() => setMobile(true)}
          />
        </div>
        <div className="h-0.5 w-full bg-white bg-opacity-10" />
      </div>
      {mobile && <Mobile setMobile={setMobile} />}
    </Fragment>
  );
}
