export default function Window(props) {
  return (
    <div className="absolute flex flex-col items-center justify-center z-0 top-0 left-0 w-screen h-screen overflow-hidden">
      <video playsInline autoPlay muted loop poster="bg.png" className="w-screen h-screen">
        <source src="bg.mp4" type="video/mp4" />
      </video>
      <div className="taskbar absolute bottom-0 left-0 flex flex-row items-center justify-between w-full h-[56px] px-5">
        <div />
        <div className="flex flex-row items-center justify-center space-x-2">
          <Favicon img="w11.png" alt="windows" />
          <Favicon img="discord.png" alt="discord" />
          <Favicon img="chrome.png" alt="chrome" />
          <Favicon img="vscode.svg" alt="vscode" />
          <Favicon img="spotify.svg" alt="spotify" />
          <Favicon img="wt.svg" alt="windows terminal" />
        </div>
        <div className="flex flex-col items-center justify-start">
          <p className="text-xs text-white">{props.time.format("h:mm A")}</p>
          <p className="text-xs text-white">{props.time.format("MM/D/YYYY")}</p>
        </div>
      </div>
    </div>
  );
}

function Favicon(props) {
  return (
    <div
      id={props.alt}
      className="flex flex-col items-center justify-center p-2 hover:bg-white hover:bg-opacity-5  rounded transition duration-200"
    >
      <img src={props.img} alt={props.alt} className="w-7 h-7" />
    </div>
  );
}
