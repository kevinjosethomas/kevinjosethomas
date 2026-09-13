import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-4 mt-8 max-w-4xl lg:mx-auto">
      <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}
