import { Link } from "react-router-dom";

const Item = ({ i, label, href }: { i: number; label: string; href: string }) => {
  return (
    <Link key={i} to={href}>
      <p className="font-std text-2xl text-white">{label}</p>
    </Link>
  );
};

export default Item;
