import Navbar from "ui/components/Navbar/Navbar";

export default function Default(props) {
  return (
    <div className="flex w-full flex-col items-center justify-start overflow-x-hidden bg-black">
      <div className="flex h-full min-h-screen w-screen flex-col items-center justify-start overflow-x-hidden pb-10 md:w-[900px]">
        <Navbar />
        <div className="flex flex-col items-start justify-start md:w-full">{props.children}</div>
      </div>
    </div>
  );
}
