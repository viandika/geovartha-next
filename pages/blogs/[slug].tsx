import { fetchStrapiAPI } from "../../lib/strapiApi";
import { ApiBlogBlog } from "../schemas";
import { StrapiMeta } from "../common";
import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";

export default function Blogs({ blogs, blogsMeta }: { blogs: ApiBlogBlog[]; blogsMeta: StrapiMeta }) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-2 sm:px-6 xl:max-w-5xl xl:px-0">
        <Link
          href={{
            pathname: "/blogs/page/[page]",
            query: { page: "1" },
          }}
          className="inline-block py-2 px-2 text-geovartha first:transform first:transition first:duration-500 first:ease-in-out first:hover:-translate-x-4"
        >
          <span className="inline-block px-2">&lt;--</span>
          <span>Back to Blogs Page</span>
        </Link>
        <h2 className="my-5 text-center text-5xl text-white">{blogs[0].attributes.Title}</h2>
        <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
        <p className="text-base italic text-gray-200">
          {new Date(blogs[0].attributes.DatePublished).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-base italic text-gray-200">By: {blogs[0].attributes.Author}</p>
        <div
          className="ck-content mt-2 text-white"
          dangerouslySetInnerHTML={createMarkup(blogs[0].attributes.AdvancedText)}
        />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const [blogsRes] = await Promise.all([fetchStrapiAPI("/blogs", { fields: ["Slug"] })]);
  return {
    paths: blogsRes.data.map((blog: ApiBlogBlog) => ({
      params: {
        slug: blog.attributes.Slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const [blogsRes] = await Promise.all([
    fetchStrapiAPI("/blogs", {
      filters: {
        slug: params.slug,
      },
      populate: {
        BlogContent: {
          populate: "*",
        },
      },
    }),
  ]);
  return {
    props: {
      blogs: blogsRes.data,
    },
  };
}

function createMarkup(text: any) {
  return { __html: text };
}
