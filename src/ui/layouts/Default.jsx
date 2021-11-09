import Navbar from "ui/components/Navbar/Navbar";

export default function Default(props) {
  return (
    <div className="flex flex-col items-center justify-start w-full overflow-x-hidden bg-black">
      <div className="flex flex-col items-center justify-start w-[900px] min-h-screen h-full pb-10 overflow-x-hidden">
        <Navbar />
        <div className="flex flex-col items-start justify-start w-full">{props.children}</div>
      </div>
    </div>
  );
}
