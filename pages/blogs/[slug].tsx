import { fetchStrapiAPI } from "../../lib/strapiApi";
import { ApiBlogBlog } from "../schemas";
import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";

export default function Blogs({ blogs, preview = false }: { blogs: ApiBlogBlog[]; preview: boolean }) {
  return (
    <>
      {preview ? (
        <div className="relative bg-indigo-600">
          <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
            <div className="pr-16 sm:px-16 sm:text-center">
              <p className="font-medium text-white">
                <span>Preview mode is on,</span>
                <span className="block sm:ml-2 sm:inline-block">
                  <a
                    href="http://localhost:3000/api/exit-preview"
                    className="hover:text-cyan underline transition-colors"
                  >
                    turn off
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : null}
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
        <h1 className="my-5 text-center text-5xl text-white">{blogs[0].attributes.Title}</h1>
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

export async function getStaticProps({ params, preview = false }: { params: { slug: string }; preview: boolean }) {
  if (preview) {
    const [blogsRes] = await Promise.all([
      fetchStrapiAPI("/blogs", {
        publicationState: "preview",
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
        preview
      },
    };
  } else {
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
}

function createMarkup(text: any) {
  return { __html: text };
}
