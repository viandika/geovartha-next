import { getStrapiMedia } from "../lib/strapiMedia";
import Image from "next/image";

export const StrapiImage = ({ image, cls }: any) => {
  const { alternativeText, width, height } = image.data.attributes;

  return (
    <Image width={width} height={height} src={getStrapiMedia(image)} alt={alternativeText || ""} className={cls} />
  );
};

export const StrapiBackground = ({ image, cls, priority }: any) => {
  const { alternativeText } = image.data.attributes;

  return (
    <Image
      fill={true}
      quality="100"
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
      className={cls}
      priority={priority}
    />
  );
};
