export default function Item(props) {
  const img = props.type === "track" ? props[props.type].albums[0].image : props[props.type].image;

  return (
    <div className="group relative flex min-h-[128px] min-w-[128px] transform select-none items-end overflow-hidden rounded p-2 duration-500 hover:scale-105 md:min-h-[192px] md:min-w-[192px]">
      <div className="z-20 flex w-full flex-col transition duration-500 group-hover:opacity-0">
        <p className="w-full truncate whitespace-nowrap text-sm font-medium text-white text-opacity-80 md:text-xl">
          {props[props.type].name.replace(/\(Taylor.s Version\)/, "TV")}
        </p>
        <p className="text-xs tracking-tight text-white text-opacity-70 md:text-sm">
          {Math.round(props.playedMs / 1000 / 60).toLocaleString()} minutes
        </p>
      </div>
      <div className="absolute top-0 left-0 z-10 h-full w-full bg-black bg-opacity-80 transition duration-500 group-hover:bg-opacity-0" />
      <img src={img} className="absolute top-0 left-0 z-0 w-full" />
    </div>
  );
}
