import { fetchStrapiAPI } from "../lib/strapiApi";
import Seo from "../components/seo";
import { StrapiBackground, StrapiImage } from "../components/StrapiImage";
import { ApiHomepageHomepage } from "./schemas";

export default function Home({ homepage }: { homepage: ApiHomepageHomepage }) {
  return (
    <>
      <Seo seo={homepage.attributes.seo} />
      <div className="relative overflow-hidden ">
        <StrapiBackground
          priority={true}
          image={homepage.attributes.Background}
          fill={true}
          cls="object-cover pointer-events-none absolute w-auto lg:max-h-[calc(100vh-5rem)] z-[0]"
        />
        <div className="relative z-10 px-6 lg:min-h-[calc(100vh-5rem)] lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-24 sm:pb-20">
            <div>
              <StrapiImage
                image={homepage.attributes.Logo}
                cls="mx-auto flex h-36 w-auto sm:h-60 sm:w-auto sm:justify-center"
              />
              <h1 className="text-4xl font-bold tracking-tight text-[#0A9FD7] sm:text-center sm:text-6xl">
                {homepage.attributes.Title}
              </h1>
              <p className="mt-6 text-xl italic leading-8 text-gray-200 sm:text-center sm:text-2xl">
                {homepage.attributes.Subtitle}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-200 sm:text-center sm:text-2xl">
                {homepage.attributes.HeroText}
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
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [homepageRes] = await Promise.all([
    fetchStrapiAPI("/homepage", {
      populate: "*",
    }),
  ]);

  return {
    props: {
      homepage: homepageRes.data,
    },
  };
}
