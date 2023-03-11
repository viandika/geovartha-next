const qs = require("qs");

function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337"}${path}`;
}
async function fetchStrapiAPI(path = "", urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;
  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occurred please try again`);
  }
  return await response.json();
}

// const [medias] = await Promise.all([
//   fetchStrapiAPI("/upload/files", {
//     fields: ["url"]
//   }),
// ]);
// console.log(medias)
// module.exports = medias.map((img) => getStrapiURL(img.url));
const medias = async () => {
  const [media] = await Promise.all([
    fetchStrapiAPI("/upload/files", {
      fields: ["url"],
    }),
  ]);
  return media.map((img) => getStrapiURL(img.url));
};
module.exports = medias();
