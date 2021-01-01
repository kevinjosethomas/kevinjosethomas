import { Navbar } from "../components/Navbar.js";

export const BasicLayout = (props) => {
  return (
    <div className="Background flex flex-col items-start justify-center w-screen max-w-full h-screen min-h-screen">
      <div className="flex flex-col items-start justify-center w-full h-full bg-dark-100 bg-opacity-90">
        <Navbar />
        { props.children }
      </div>
    </div>
  )
}
