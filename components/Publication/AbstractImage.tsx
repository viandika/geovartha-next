import { StrapiImage } from "../StrapiImage";
import React from "react";

const AbstractImages = ({Media}: {Media: string}) => {
  return (
    <StrapiImage cls="h-auto w-full sm:h-auto lg:max-w-[50%] object-center mx-auto object-cover object-center my-2" image={Media} />
  )
}

export default AbstractImages;