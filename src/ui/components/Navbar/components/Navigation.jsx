import { useRouter } from "next/router";

import Element from "./Element";
import Dropdown from "./Dropdown";

export default function Navigation(props) {
  const elements = [
    {
      label: "/",
      href: "/",
    },
    {
      label: "/projects",
      href: "/projects",
    },
    {
      label: "/awards",
      href: "/awards",
    },
    {
      label: "/stack",
      href: "/stack",
    },
  ];

  const router = useRouter();

  return (
    <div className="terminal flex flex-row items-center justify-start space-x-8">
      {elements.map((el, ind) => (
        <Element key={ind} {...el} active={router.pathname === el.href} />
      ))}
      <Dropdown />
    </div>
  );
}
