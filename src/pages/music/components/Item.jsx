export default function Item(props) {
  const img = props.type === "track" ? props[props.type].albums[0].image : props[props.type].image;

  return (
    <div className="group relative flex min-h-[192px] min-w-[192px] transform select-none items-end overflow-hidden rounded p-2 duration-500 hover:scale-105">
      <div className="z-20 flex flex-col transition duration-500 group-hover:opacity-0">
        <p className="whitespace-nowrap text-xl font-medium text-white text-opacity-80">
          {props[props.type].name.replace("(Taylor's Version)", "TV").split("(")[0]}
        </p>
        <p className="text-sm tracking-tight text-white text-opacity-70">
          {Math.round(props.playedMs / 1000 / 60).toLocaleString()} minutes
        </p>
      </div>
      <div className="absolute top-0 left-0 z-10 h-full w-full bg-black bg-opacity-80 transition duration-500 group-hover:bg-opacity-0" />
      <img src={img} className="absolute top-0 left-0 z-0 w-full" />
    </div>
  );
}
