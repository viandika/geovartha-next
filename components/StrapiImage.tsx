import { getStrapiMedia } from "../lib/strapiMedia";
// import Image from "next/image";
import ExportedImage from "next-image-export-optimizer";

export const StrapiImage = ({ image, cls }: any) => {
  const { alternativeText, width, height } = image.data.attributes;
  return (
    <ExportedImage width={width} height={height} src={getStrapiMedia(image)} alt={alternativeText || ""} className={cls} />
  );
};

export const StrapiBackground = ({ image, cls, priority }: any) => {
  const { alternativeText } = image.data.attributes;

  return (
    <ExportedImage
      fill={true}
      // quality="100"
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
      className={cls}
      priority={priority}
    />
  );
};
