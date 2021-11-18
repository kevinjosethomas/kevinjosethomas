import Link from "next/link";

export default function Mobile(props) {
  const links = [
    {
      label: "home",
      href: "/",
    },
    {
      label: "/projects",
      href: "/projects",
    },
    {
      label: "/awards",
      href: "/awards",
    },
    {
      label: "/stack",
      href: "/stack",
    },
    {
      label: "/setup",
      href: "/setup",
    },
  ];

  return (
    <div className="absolute z-50 flex md:hidden flex-col items-center justify-between w-screen h-screen bg-black pb-10 overflow-hidden">
      <div className="flex md:hidden flex-col items-start justify-start w-[90%] py-5 space-y-8">
        <div className="flex flex-col items-start justify-start w-full space-y-4">
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-xl text-white text-opacity-70">Kevin Thomas</p>
            <i
              className="far fa-times text-xl text-white text-opacity-70"
              onClick={() => props.setMobile(false)}
            />
          </div>
          <div className="w-full h-0.5 bg-white bg-opacity-10" />
        </div>
        <div className="flex flex-col items-start justify-center w-[90%] space-y-3">
          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              <a className="text-2xl text-white text-opacity-70 hover:text-opacity-90 transition duration-300">
                {link.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-8">
        <Twitter />
        <GitHub />
      </div>
    </div>
  );
}

function Twitter() {
  return (
    <a
      target="_blank"
      href="https://twitter.com/trustedmercury"
      className="text-white text-opacity-70 hover:text-opacity-90 transition duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-twitter"
      >
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
      </svg>
    </a>
  );
}

function GitHub() {
  return (
    <a
      target="_blank"
      href="https://github.com/trustedmercury"
      className="text-white text-opacity-70 hover:text-opacity-90 transition duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-github"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    </a>
  );
}
