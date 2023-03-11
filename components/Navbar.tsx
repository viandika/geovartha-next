import Link from "next/link";
import GeovLogo from "../public/cropped-vartha-research.png";
import { useState } from "react";
import { useRouter } from "next/router";
import ExportedImage from "next-image-export-optimizer";

export const Navbar = () => {
  const [navShow, setNavShow] = useState(false);
  const handleNavClick = () => {
    setNavShow(!navShow);
  };
  const router = useRouter();
  return (
    <nav className="border-gray-600 bg-neutral-800 px-2 py-2.5 sm:h-20 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center">
          <ExportedImage src={GeovLogo} className="mr-3 h-9 w-auto sm:h-12" alt="Geovartha Logo" />
        </Link>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
          aria-expanded="false"
          onClick={handleNavClick}
        >
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className={`${navShow ? "" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-neutral-600 bg-neutral-800 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-neutral-800 md:text-sm md:font-medium">
            <li key="homeLink">
              <Link
                href="/"
                className={`block rounded py-2 pl-3 pr-4 ${
                  router.pathname == "/" ? "text-white underline" : "text-gray-400"
                } hover:bg-gray-700 md:border-0 md:p-0 md:text-lg md:hover:bg-transparent md:hover:text-white`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li key="aboutLink">
              <Link
                href="/about"
                className={`block rounded py-2 pl-3 pr-4 ${
                  router.pathname == "/about" ? "text-white underline" : "text-gray-400"
                } hover:bg-gray-700 md:border-0 md:p-0 md:text-lg md:hover:bg-transparent md:hover:text-white`}
              >
                About
              </Link>
            </li>
            <li key="publicationsLink">
              <Link
                href={{
                  pathname: "/publications/page/[page]",
                  query: { page: "1" },
                }}
                className={`block rounded py-2 pl-3 pr-4 ${
                  router.pathname.includes("/publications") ? "text-white underline" : "text-gray-400"
                } hover:bg-gray-700 md:border-0 md:p-0 md:text-lg md:hover:bg-transparent md:hover:text-white`}
              >
                Publications
              </Link>
            </li>
            <li key="projectsLink">
              <Link
                href="/projects"
                className={`block rounded py-2 pl-3 pr-4 ${
                  router.pathname == "/projects" ? "text-white underline" : "text-gray-400"
                } hover:bg-gray-700 md:border-0 md:p-0 md:text-lg md:hover:bg-transparent md:hover:text-white`}
              >
                Projects
              </Link>
            </li>
            <li key="blogsLink">
              <Link
                href={{
                  pathname: "/blogs/page/[page]",
                  query: { page: "1" },
                }}
                className={`block rounded py-2 pl-3 pr-4 ${
                  router.pathname.includes("/blogs") ? "text-white underline" : "text-gray-400"
                } hover:bg-gray-700 md:border-0 md:p-0 md:text-lg md:hover:bg-transparent md:hover:text-white`}
              >
                Blogs
              </Link>
            </li>
            <li key="contactLink">
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-gray-400 hover:bg-gray-700 md:border-0 md:p-0 md:text-lg md:hover:bg-transparent md:hover:text-white"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
