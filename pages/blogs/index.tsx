import * as Separator from "@radix-ui/react-separator";
import { fetchStrapiAPI } from "../../lib/strapiApi";
import { ApiBlogBlog } from "../schemas";

export default function Blogs({ blogs }: { blogs: ApiBlogBlog[] }) {
  console.log(blogs[0].attributes.DatePublished);
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-2 sm:px-6 xl:max-w-5xl xl:px-0">
        <h2 className="my-5 text-center text-5xl text-white">Blogs</h2>
        <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
        <div className="grid grid-cols-1 gap-4">
          {blogs.map((blog) => {
            return (
              <div
                key={blog.attributes.Title}
                className="mx-4 h-auto rounded-xl bg-neutral-700 p-4 shadow hover:shadow-xl"
              >
                <h2 className="mb-2 text-xl text-geovartha">{blog.attributes.Title}</h2>
                <p className="text-base italic text-gray-200">
                  {new Date(blog.attributes.DatePublished).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-base italic text-gray-200">By: {blog.attributes.Author}</p>
                <div
                  className="ck-content mt-2 text-white"
                  dangerouslySetInnerHTML={createMarkup(blog.attributes.AdvancedText)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [blogsRes] = await Promise.all([
    fetchStrapiAPI("/blogs", {
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
