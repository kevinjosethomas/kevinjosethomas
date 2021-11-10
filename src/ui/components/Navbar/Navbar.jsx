import { Fragment } from "react";

import Socials from "./components/Socials";
import Navigation from "./components/Navigation";

export default function Navbar(props) {
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
          <i className="far fa-bars text-xl text-white text-opacity-70" />
        </div>
        <div className="w-full h-0.5 bg-white bg-opacity-10" />
      </div>
    </Fragment>
  );
}
