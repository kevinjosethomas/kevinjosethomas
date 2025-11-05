import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-between py-12">
      <p>kjthomas@uwaterloo.ca</p>
      <div className="flex items-center justify-end gap-4">
        <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} />
        <Image src="/icons/x.svg" alt="X" width={20} height={20} />
      </div>
    </footer>
  );
}
