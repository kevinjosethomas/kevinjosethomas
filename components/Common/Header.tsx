import Link from "next/link";

const navItems = [
  { href: "/", name: "home" },
  { href: "/projects", name: "projects" },
];

export default function Header() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade scroll-pr-6 relative flex flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
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
      </div>
    </aside>
  );
}
