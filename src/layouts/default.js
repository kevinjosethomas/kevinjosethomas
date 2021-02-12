import { Navbar } from "../components/Navbar";

export const Default = (props) => {

  return (
    <div className="bg flex flex-col items-start justify-center h-full min-h-screen">
      <div className="flex flex-col items-start justify-center h-screen">
        <Navbar />
        { props.children }
      </div>
    </div>
  )

}
