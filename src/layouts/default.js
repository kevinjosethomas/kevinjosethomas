import { Navbar } from "../components/Navbar";

export const Default = (props) => {

  return (
    <div className="flex flex-col items-start justify-center w-full h-full overflow-x-hidden">
      <Navbar />
      { props.children }
    </div>
  )

}
