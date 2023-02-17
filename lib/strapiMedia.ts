import { getStrapiURL } from "./strapiApi";

export function getStrapiMedia(media: any) {
  const { url } = media.data.attributes;
  return url.startsWith("/") ? getStrapiURL(url) : url;
}
