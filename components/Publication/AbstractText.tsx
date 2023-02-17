import ReactMarkdown from "react-markdown";
import React from "react";

const AbstractText = ({ Body }: { Body: string }) => {
  return <ReactMarkdown className="my-2 text-base font-normal leading-relaxed text-gray-300">{Body}</ReactMarkdown>;
};

export default AbstractText;
