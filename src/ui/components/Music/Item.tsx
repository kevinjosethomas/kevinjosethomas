export default function Item({
  index,
  name,
  img,
  mins,
}: {
  index: number;
  name: string;
  img: string;
  mins: number;
}) {
  return (
    <div className="group relative flex min-h-[164px] min-w-[164px] select-none items-end overflow-hidden rounded p-2 duration-500 hover:scale-105">
      <div className="z-20 flex w-full flex-col transition duration-500 group-hover:opacity-0">
        <p className="w-full truncate whitespace-nowrap text-lg font-medium text-white text-opacity-80">
          {index}. {name}
        </p>
        <p className="text-sm text-white text-opacity-60">{mins.toLocaleString()} minutes</p>
      </div>
      <div className="absolute top-0 left-0 z-10 h-full w-full bg-black bg-opacity-80 transition duration-500 group-hover:bg-opacity-0" />
      <img src={img} alt={name} className="absolute top-0 left-0 w-full" />
    </div>
  );
}
