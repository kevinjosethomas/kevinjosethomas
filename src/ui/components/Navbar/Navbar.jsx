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
      <div className="hidden md:flex flex-col items-start justify-start w-full py-10 space-y-4">
        <div className="flex flex-row items-center justify-between w-full">
          <Navigation />
          <Socials />
        </div>
        <div className="w-full h-0.5 bg-white bg-opacity-10" />
      </div>
      <div className="flex md:hidden flex-col items-start justify-start w-[90%] py-5 space-y-4">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="text-xl text-white text-opacity-70">Kevin Thomas</p>
          <i
            className="far fa-bars text-xl text-white text-opacity-70"
            onClick={() => setMobile(true)}
          />
        </div>
        <div className="w-full h-0.5 bg-white bg-opacity-10" />
      </div>
      {mobile && <Mobile setMobile={setMobile} />}
    </Fragment>
  );
}
