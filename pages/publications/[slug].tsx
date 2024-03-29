﻿import { fetchStrapiAPI } from "../../lib/strapiApi";
import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";
import Seo from "../../components/seo";
import { StrapiImage } from "../../components/StrapiImage";
import ReactMarkdown from "react-markdown";
import { ApiPublicationPublication } from "../contentTypes";

export default function Publications({ publications }: { publications: ApiPublicationPublication[] }) {
  return (
    <>
      <Seo seo={publications[0].attributes.seo} />
      <div className="mx-auto max-w-3xl px-4 pb-2 sm:px-6 xl:max-w-7xl xl:px-0">
        <Link
          href={{
            pathname: "/publications/page/[page]",
            query: { page: "1" },
          }}
          className="inline-block py-2 px-2 text-geovartha first:transform first:transition first:duration-500 first:ease-in-out first:hover:-translate-x-4"
        >
          <span className="inline-block px-2">&lt;--</span>
          <span>Back to Publications Page</span>
        </Link>
        <h1 className="my-5 text-center text-5xl text-white">{publications[0].attributes.Title}</h1>
        <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
        <h2 className="text-xl italic text-white">Authors: {publications[0].attributes.Authors}</h2>
        <p className="mb-4 text-white">
          {new Date(publications[0].attributes.PublicationDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <StrapiImage
          cls="h-auto w-full sm:h-auto lg:max-w-[50%] object-center mx-auto object-cover object-center my-4"
          image={publications[0].attributes.Image}
        />
        <ReactMarkdown className="text-base font-normal text-gray-300 my-2 leading-relaxed text-justify whitespace-pre-wrap">
          {publications[0].attributes.Abstract}
        </ReactMarkdown>
        <a
          href={publications[0].attributes.ReadMoreUrl}
          target="_blank"
          rel="noreferrer"
          className="text-orange-400 hover:text-orange-500 text-base cursor-pointer"
        >
          Read More...
        </a>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const [publicationsRes] = await Promise.all([fetchStrapiAPI("/publications", { fields: ["Slug"] })]);
  return {
    paths: publicationsRes.data.map((publication: ApiPublicationPublication) => ({
      params: {
        slug: publication.attributes.Slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const [publicationsRes] = await Promise.all([
    fetchStrapiAPI("/publications", {
      filters: {
        slug: params.slug,
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
      publications: publicationsRes.data,
    },
  };
}
