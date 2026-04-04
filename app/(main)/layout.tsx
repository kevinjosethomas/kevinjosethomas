import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col items-center md:px-16">
      <Header />
      <main className="border-border w-full overflow-x-clip md:border">
        {children}
      </main>
      <Footer />
    </div>
  );
}
