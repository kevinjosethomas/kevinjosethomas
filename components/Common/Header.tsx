import Link from "next/link";

const navItems = [
  { href: "/", name: "home" },
  { href: "/projects", name: "projects" },
];

export default function Header() {
  return (
    <header className="mb-16 flex items-center justify-between tracking-tight">
      <Link
        href="/"
        className="hover:opacity-80 m-1 px-2 py-1 text-xl font-semibold tracking-tighter transition-all"
      >
        kevin thomas
      </Link>
      <nav
        className="fade scroll-pr-6 relative flex flex-row items-center px-0 pb-0 md:relative md:overflow-auto"
        id="nav"
      >
        <div className="flex flex-row space-x-0">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 m-1 flex align-middle relative px-2 py-1"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
