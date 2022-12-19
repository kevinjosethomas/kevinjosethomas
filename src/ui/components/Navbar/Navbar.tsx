import Item from "./Item";

const Navbar = () => {
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
    <div className="flex w-full flex-col space-y-4">
      <h1 className="font-std text-7xl font-bold text-white">kevin thomas</h1>
      <div className="flex items-center space-x-6">
        {items.map((item, i) => (
          <Item i={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
