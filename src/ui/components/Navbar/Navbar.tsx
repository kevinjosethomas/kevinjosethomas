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
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-5xl font-extrabold text-white 2xl:text-6xl">
        kevin thomas
      </h1>
      <div className="flex items-center gap-4">
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
        <Dropdown />
      </div>
    </div>
  );
}
