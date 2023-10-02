import * as Separator from "@radix-ui/react-separator";
import { fetchStrapiAPI } from "../../../lib/strapiApi";
import Link from "next/link";
import { StrapiMeta } from "../../common";
import { ApiPublicationPublication } from "../../contentTypes";
import { StrapiImage } from "../../../components/StrapiImage";
import ReactMarkdown from "react-markdown";

const publicationsPerPage = 5;

export default function Publications({
  publications,
  publicationsMeta,
}: {
  publications: ApiPublicationPublication[];
  publicationsMeta: StrapiMeta;
}) {
  const pagesArr = Array.from(Array(publicationsMeta.pagination.pageCount), (_, i) => i + 1);
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pb-2 sm:px-6 xl:max-w-7xl xl:px-0">
        <h2 className="my-5 text-center text-5xl text-white">Publications</h2>
        <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
        {publications.map((publication) => {
          return (
            <div key={publication.attributes.Title} className="mt-8 rounded-xl bg-neutral-700 p-4 shadow">
              <Link href={`/publications/${publication.attributes.Slug}`}>
                <h2 className="mb-2 text-3xl text-geovartha">{publication.attributes.Title}</h2>
              </Link>
              <h3 className="italic text-white">Authors: {publication.attributes.Authors}</h3>
              <p className="text-white">{publication.attributes.PublicationDate}</p>
              <StrapiImage
                cls="h-auto w-full sm:h-auto lg:max-w-[50%] object-center mx-auto object-cover object-center my-4"
                image={publication.attributes.Image}
              />
              <ReactMarkdown className="text-base font-normal text-gray-300 my-2 leading-relaxed text-justify whitespace-pre-wrap">
                {publication.attributes.Abstract}
              </ReactMarkdown>
              <a
                href={publication.attributes.ReadMoreUrl}
                target="_blank"
                rel="noreferrer"
                className="text-orange-400 hover:text-orange-500 text-base cursor-pointer"
              >
                Read More...
              </a>
            </div>
          );
        })}
        <nav className="flex justify-center">
          <ul className="mt-5 inline-flex items-center -space-x-px">
            <li>
              <Link
                href={`/publications/page/${
                  publicationsMeta.pagination.page < publicationsMeta.pagination.pageCount
                    ? publicationsMeta.pagination.page - 1
                    : publicationsMeta.pagination.page
                }`}
                className="ml-0 block rounded-l-lg border border-neutral-500 bg-neutral-700 px-3 py-2 leading-tight text-white hover:bg-neutral-500 hover:text-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </li>
            {pagesArr.map((value) => {
              return (
                <li key={value}>
                  <Link
                    href={`/publications/page/${
                      value === publicationsMeta.pagination.page ? publicationsMeta.pagination.page : value
                    }`}
                    className={`block border border-neutral-500 px-3 py-2 leading-tight hover:bg-neutral-500 hover:text-gray-700 ${
                      value === publicationsMeta.pagination.page
                        ? "bg-neutral-500 text-gray-700"
                        : "bg-neutral-700 text-white"
                    }`}
                  >
                    {value}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={`/publications/page/${
                  publicationsMeta.pagination.page < publicationsMeta.pagination.pageCount
                    ? publicationsMeta.pagination.page + 1
                    : publicationsMeta.pagination.page
                }`}
                className="block rounded-r-lg border border-neutral-500 bg-neutral-700 px-3 py-2 leading-tight text-white hover:bg-neutral-500 hover:text-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const [publicationsRes] = await Promise.all([
    fetchStrapiAPI("/publications", {
      sort: ["PublicationDate:desc"],
      fields: ["id"],
      pagination: {
        pageSize: publicationsPerPage,
      },
    }),
  ]);
  let paths = [];
  for (let i = 0; i < publicationsRes.meta.pagination.pageCount; i++) {
    paths.push({
      params: { page: `${i + 1}` },
    });
  }
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { page: number } }) {
  // Run API calls in parallel
  const [PublicationsRes] = await Promise.all([
    fetchStrapiAPI("/publications", {
      sort: ["PublicationDate:desc"],
      pagination: {
        page: params.page,
        pageSize: publicationsPerPage,
      },
      populate: {
        Image: {
          populate: "*",
        },
      },
    }),
  ]);
  return {
    props: {
      publications: PublicationsRes.data,
      publicationsMeta: PublicationsRes.meta,
    },
  };
}
