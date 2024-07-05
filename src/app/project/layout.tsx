export default function Project({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-start justify-center bg-black">
      <div className="flex w-[1024px] items-center justify-start py-16">
        {children}
      </div>
    </div>
  );
}
