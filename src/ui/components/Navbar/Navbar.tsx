import Link from "next/link";
import Dropdown from "./Dropdown";

export default function Navbar() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="text-5xl font-extrabold text-white decoration-1 underline-offset-8 hover:underline 2xl:text-6xl">
            kevin thomas
          </h1>
        </Link>
        <Dropdown />
      </div>
    </div>
  );
}
