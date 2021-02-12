import Link from "next/link";

export const Navbar = () => {

  return (
    <nav className="flex flex-row items-center justify-start w-full px-40 pt-10">
      <Link href="/">
        <a className="mr-4 font-medium text-2xl text-gray-200 hover:text-gray-400"><i className="far fa-home" /></a>
      </Link>
      <Link href="/projects">
        <a className="mx-4 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400">projects</a>
      </Link>
      <Link href="/skills">
        <a className="mx-4 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400">skills</a>
      </Link>
      <a
        target="_blank"
        href="https://blog.kevinthomas.codes/"
        className="ml-4 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400"
      >blog</a>
    </nav>
  )

}
