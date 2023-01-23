import * as Separator from "@radix-ui/react-separator";
import { fetchStrapiAPI } from "../../lib/strapiApi";
import { ApiPublicationPublication } from "../schemas";
import AbstractBlock from "../../components/Publication/AbstractBlock";

export default function Publications({ publications }: { publications: ApiPublicationPublication[] }) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-7xl xl:px-0 pb-2">
        <h2 className="my-5 text-center text-5xl text-white">Publications</h2>
        <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
        {publications.map((publication) => {
          return (
            <div key={publication.attributes.Title} className="bg-neutral-700 rounded-xl shadow p-4 mt-8">
              <h2 className="text-white text-3xl mb-2 underline">{publication.attributes.Title}</h2>
              <h3 className="italic text-white">Authors: {publication.attributes.Authors}</h3>
              <p className="text-white">{publication.attributes.PublicationDate}</p>
              <AbstractBlock blocks={publication.attributes.Abstract} />
            </div>
            
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [PublicationsRes] = await Promise.all([
    fetchStrapiAPI("/publications", {
      populate: {
        Abstract: {
          populate: "*",
        },
      },
    }),
  ]);
  return {
    props: {
      publications: PublicationsRes.data,
    },
  };
}
