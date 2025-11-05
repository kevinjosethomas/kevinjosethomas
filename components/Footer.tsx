import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-between px-6 py-4 md:px-0 md:py-12">
      <p>kjthomas@uwaterloo.ca</p>
      <div className="flex items-center justify-end gap-4">
        <Link href="https://x.com/kevinjosethomas" target="_blank">
          <Image src="/icons/x.svg" alt="X" width={20} height={20} />
        </Link>
        <Link href="https://github.com/kevinjosethomas" target="_blank">
          <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} />
        </Link>
      </div>
    </footer>
  );
}
