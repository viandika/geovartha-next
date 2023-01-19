import { ApiError404PageError404Page } from "./schemas";
import { fetchStrapiAPI } from "../lib/strapiApi";

export default function Custom404({notFound}: {notFound: ApiError404PageError404Page}) {
  return <h1>{notFound.attributes.ErrorMessage}</h1>
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [notFoundRes] = await Promise.all([
    fetchStrapiAPI("/error-404-page", {
      populate: "*",
    }),
  ]);
  return {
    props: {
      notFound: notFoundRes.data,
    },
  };
}