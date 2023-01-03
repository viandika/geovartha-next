import Image from "next/image";
import GeovLogo from "../public/logo.png";

export default function Home() {
  return (
    <>
      <div className="relative bg-[url('../public/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat px-6 lg:min-h-[calc(100vh-5rem)] lg:px-8">
        <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-24 sm:pb-20">
          <div>
            <Image
              src={GeovLogo}
              alt="Geovartha Logo"
              className="mx-auto flex h-36 w-auto sm:h-60 sm:w-auto sm:justify-center"
            />
            <h1 className="text-4xl font-bold tracking-tight text-[#0A9FD7] sm:text-center sm:text-6xl">
              Geovartha Research Group
            </h1>
            <p className="mt-6 text-xl italic leading-8 text-gray-200 sm:text-center sm:text-2xl">
              Coalescing Technology and Earth Science
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-200 sm:text-center sm:text-2xl">
              We are committed to explore and spread the most advanced development of geoscientific technology by
              keeping up with the technology development in the geoscientific subject and proposing solutions based on
              the continual R&D
            </p>
            <div className="mt-8 flex gap-x-4 sm:justify-center">
              <a
                href="#"
                className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
              >
                About Us
                <span className="text-indigo-200" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
