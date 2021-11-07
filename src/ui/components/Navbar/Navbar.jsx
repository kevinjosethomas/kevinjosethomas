import Socials from "./components/Socials";
import Navigation from "./components/Navigation";

export default function Navbar(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full py-10">
      <div className="flex flex-row items-center justify-between w-full">
        <Navigation />
        <Socials />
      </div>
    </div>
  );
}
