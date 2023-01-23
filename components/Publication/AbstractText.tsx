import ReactMarkdown from "react-markdown";
import React from "react";

const AbstractText = ({Body}: {Body: string}) => {
  return (
    <ReactMarkdown className="text-base font-normal leading-relaxed text-gray-300 my-2">{Body}</ReactMarkdown>
  )
}

export default AbstractText;