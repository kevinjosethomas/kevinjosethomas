import Item from "./Item";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const items = [
    {
      label: "who am i",
      href: "/",
    },
    {
      label: "my work",
      href: "/work",
    },
    {
      label: "my stack",
      href: "/stack",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2 2xl:gap-4">
      <h1 className="font-std text-5xl font-bold text-white 2xl:text-6xl">
        kevin thomas
      </h1>
      <div className="flex items-center gap-6">
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
        <Dropdown />
      </div>
    </div>
  );
}
