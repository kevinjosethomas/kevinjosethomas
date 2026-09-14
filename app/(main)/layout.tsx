import Header from "@/components/Common/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-4 mt-8 max-w-3xl tracking-[0.02em] lg:mx-auto">
      <main className="mt-6 flex min-w-0 flex-col px-2 md:px-0">
        <Header />
        {children}
      </main>
    </div>
  );
}
