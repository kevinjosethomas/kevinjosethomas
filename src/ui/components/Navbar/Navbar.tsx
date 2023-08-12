import { useRouter } from "next/router";

import Item from "./Item";

const Navbar = ({ name }: { name?: boolean }) => {
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
      {name && (
        <h1 className="font-std text-6xl font-bold text-white 2xl:text-7xl">kevin thomas</h1>
      )}
      <div className="flex items-center space-x-6">
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
