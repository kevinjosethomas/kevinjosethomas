import Item from "./Item";

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
    <div className="flex w-full flex-col gap-4">
      <h1 className="font-std text-6xl font-bold text-white 2xl:text-7xl">kevin thomas</h1>
      <div className="flex items-center gap-6">
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
