﻿import { fetchStrapiAPI } from "../../../lib/strapiApi";
import * as Separator from "@radix-ui/react-separator";
import { StrapiMeta } from "../../common";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { StrapiImage } from "../../../components/StrapiImage";
import Head from "next/head";
import { ApiBlogBlog } from "../../contentTypes";

const blogsPerPage = 5;

export default function Blogs({ blogs, blogsMeta }: { blogs: ApiBlogBlog[]; blogsMeta: StrapiMeta }) {
  const pagesArr = Array.from(Array(blogsMeta.pagination.pageCount), (_, i) => i + 1);
  return (
    <>
      <Head key="blogs-page">
        <title>Blogs | GeoVartha</title>
      </Head>
      <div className="mx-auto max-w-3xl px-4 py-2 sm:px-6 xl:max-w-5xl xl:px-0">
        <h1 className="my-5 text-center text-5xl text-white">Blogs</h1>
        <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
        <div className="grid grid-cols-1 gap-4">
          {blogs.map((blog) => {
            return (
              <div
                key={blog.attributes.Title}
                className="mx-4 h-auto rounded-xl bg-neutral-700 p-4 shadow hover:shadow-xl"
              >
                <Link href={`/blogs/${blog.attributes.Slug}`}>
                  <h2 className="mb-2 text-xl text-geovartha">{blog.attributes.Title}</h2>
                </Link>
                <p className="text-base italic text-gray-200">
                  {new Date(blog.attributes.PublishedDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-base italic text-gray-200">By: {blog.attributes.Author}</p>
                <StrapiImage
                  cls="h-auto w-full sm:h-auto lg:max-w-[50%] object-center mx-auto object-cover object-center my-4"
                  image={blog.attributes.Image}
                />
                <ReactMarkdown className="text-base font-normal text-gray-300 my-2 leading-relaxed text-justify whitespace-pre-wrap">
                  {blog.attributes.Content}
                </ReactMarkdown>
                <a
                  href={blog.attributes.ReadMoreURL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-400 hover:text-orange-500 text-base cursor-pointer"
                >
                  Read More...
                </a>
              </div>
            );
          })}
        </div>
        <nav className="flex justify-center">
          <ul className="mt-5 inline-flex items-center -space-x-px">
            <li>
              <Link
                href={`/blogs/page/${
                  blogsMeta.pagination.page < blogsMeta.pagination.pageCount
                    ? blogsMeta.pagination.page - 1
                    : blogsMeta.pagination.page
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
                    href={`/blogs/page/${value === blogsMeta.pagination.page ? blogsMeta.pagination.page : value}`}
                    className={`block border border-neutral-500 px-3 py-2 leading-tight hover:bg-neutral-500 hover:text-gray-700 ${
                      value === blogsMeta.pagination.page ? "bg-neutral-500 text-gray-700" : "bg-neutral-700 text-white"
                    }`}
                  >
                    {value}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={`/blogs/page/${
                  blogsMeta.pagination.page < blogsMeta.pagination.pageCount
                    ? blogsMeta.pagination.page + 1
                    : blogsMeta.pagination.page
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
  const [blogsRes] = await Promise.all([
    fetchStrapiAPI("/blogs", {
      sort: ["PublishedDate:desc"],
      fields: ["id"],
      pagination: {
        pageSize: blogsPerPage,
      },
    }),
  ]);
  let paths = [];
  for (let i = 0; i < blogsRes.meta.pagination.pageCount; i++) {
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
  const [blogsRes] = await Promise.all([
    fetchStrapiAPI("/blogs", {
      sort: ["PublishedDate:desc"],
      pagination: {
        page: params.page,
        pageSize: blogsPerPage,
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
      blogs: blogsRes.data,
      blogsMeta: blogsRes.meta,
    },
  };
}
