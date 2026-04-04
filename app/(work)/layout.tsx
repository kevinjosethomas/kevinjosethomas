export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="work-enter flex min-h-screen w-full flex-col items-center overflow-x-clip">
      {children}
    </div>
  );
}
