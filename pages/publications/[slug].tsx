import { fetchStrapiAPI } from "../../lib/strapiApi";
import { ApiPublicationPublication } from "../schemas";
import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";

export default function Publications({ publications }: { publications: ApiPublicationPublication[] }) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pb-2 sm:px-6 xl:max-w-7xl xl:px-0 pb-6">
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
        <h2 className="my-5 text-center text-5xl text-white">{publications[0].attributes.Title}</h2>
        <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
        <h4 className="italic text-white text-xl">Authors: {publications[0].attributes.Authors}</h4>
        <p className="text-white mb-4">
          {new Date(publications[0].attributes.PublicationDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div
          className="ck-content mt-2 text-white"
          dangerouslySetInnerHTML={createMarkup(publications[0].attributes.Abstract)}
        />
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
    }),
  ]);
  return {
    props: {
      publications: publicationsRes.data,
    },
  };
}

function createMarkup(text: any) {
  return { __html: text };
}
