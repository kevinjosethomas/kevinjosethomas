import Link from "next/link"

export const Navbar = () => {

  return (
    <nav className="flex flex-row items-center justify-start w-full pl-40">
      <Link href="/">
        <a className="mr-8 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400">home</a>
      </Link>
      <Link href="/projects">
        <a className="mr-8 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400">projects</a>
      </Link>
      <Link href="/skills">
        <a className="mr-8 font-inter font-medium text-2xl text-gray-200 hover:text-gray-400">skills</a>
      </Link>
        <a
          href="blog.kevinthomas.codes"
          className="font-inter font-medium text-2xl text-gray-200 hover:text-gray-400">
          blog
        </a>
    </nav>
  )

}
