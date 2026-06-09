"use client";

import { usePathname } from "next/navigation";

export default function MainContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";

  return (
    <main
      className={`w-full overflow-x-clip ${
        isProjectsPage ? "" : "border-border md:border"
      }`}
    >
      {children}
    </main>
  );
}
