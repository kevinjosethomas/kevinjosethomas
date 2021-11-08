export default function Project(props) {
  return (
    <a
      target="_blank"
      href={props.href}
      className="flex flex-row items-center justify-start w-full hover:bg-white hover:bg-opacity-5 border-[1px] border-white border-opacity-10 rounded transition duration-300"
    >
      <div className="flex flex-col items-start justify-center h-28 min-w-[232px] p-5 border-[1px] border-white border-opacity-10">
        <div className="flex flex-row items-center justify-center space-x-2">
          <p className="terminal text-xl text-white text-opacity-90 leading-snug">{props.title}</p>
          <div
            className={`w-2 h-2 ${
              props.status === 1
                ? "bg-green-500"
                : props.status === 0
                ? "bg-yellow-500"
                : "bg-red-500"
            } rounded-full`}
          />
        </div>
        <p className="text-lg text-white text-opacity-80 leading-snug">{props.subtitle}</p>
        <p className="text-sm text-white text-opacity-80 leading-snug">{props.date}</p>
      </div>
      <div className="flex flex-col items-start justify-center h-28 w-full p-5 border-[1px] border-white border-opacity-5">
        <p className="text-lg text-white text-opacity-80 leading-snug">{props.description}</p>
      </div>
    </a>
  );
}