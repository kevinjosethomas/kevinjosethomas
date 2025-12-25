import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col items-center">
      <Header />
      <main className="border-border w-full border">{children}</main>
      <Footer />
    </div>
  );
}
