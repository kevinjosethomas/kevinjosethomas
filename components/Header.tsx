import Image from "next/image";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between py-12">
      <div className="flex items-center justify-start gap-6">
        <h1 className="text-3xl font-bold">kevin thomas</h1>
        <p className="text-secondary text-xl">projects</p>
        <p className="text-secondary text-xl">writing</p>
      </div>
      <div className="flex items-center justify-start gap-6">
        <Image src="/icons/x.svg" alt="X" width={20} height={20} />
        <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} />
      </div>
    </header>
  );
}
