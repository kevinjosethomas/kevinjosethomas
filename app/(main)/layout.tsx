import Header from "@/components/Common/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen justify-center px-6 pt-[67.2px] pb-[42px] md:px-[42px]">
      <div className="flex w-full max-w-[604.8px] flex-col items-start text-[15px] tracking-normal">
        <main className="w-full">
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
}
