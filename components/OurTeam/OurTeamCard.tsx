import React from "react";
import { StrapiImage } from "../StrapiImage";
import ReactMarkdown from "react-markdown";

type OurTeamCardProps = {
  image: JSX.Element;
  name: string;
  position: string;
  description: string;
  linkedin?: string;
  github?: string;
  researchGate?: string;
  twitter?: string;
  email?: string;
};

const OurTeamCard = ({
  image,
  name,
  position,
  description,
  linkedin,
  researchGate,
  email,
  twitter,
  github,
}: OurTeamCardProps) => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg shadow bg-neutral-700 hover:shadow-xl md:flex-row">
      {/*<div className="h-full w-auto sm:w-64 md:h-80 lg:h-64">*/}
        <StrapiImage cls="h-auto w-full sm:h-auto lg:w-1/3 object-cover object-center" image={image} />
      {/*</div>*/}
      <div className="w-full space-y-2 p-6 text-left md:p-4">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <span className="text-base font-normal text-white italic">{position}</span>
        <ReactMarkdown className="text-base font-normal leading-relaxed text-gray-300">{description}</ReactMarkdown>
        <div className="flex space-y-0 space-x-3">
          {linkedin && (
            <svg
              className="h-6 w-6 cursor-pointer fill-gray-400 hover:fill-[#0a66c2]"
              onClick={() => window.open(linkedin, "_blank")}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          )}
          {github && (
            <svg
              className="h-6 w-6 cursor-pointer fill-gray-400 hover:fill-gray-600"
              onClick={() => window.open(github, "_blank")}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          )}
          {researchGate && (
            <svg
              className="h-6 w-6 cursor-pointer fill-gray-400 hover:fill-[#00d0af]"
              onClick={() => window.open(researchGate, "_blank")}
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect height="512" rx="15%" width="512" />
              <g fill="#171717">
                <path d="m271 383c-15-4-23-10-36-26-9-12-26-39-35-53l-6-11h-24v34c1 43 0 42 19 45l10 1v4 4h-80v-4c0-4 1-4 9-6 10-2 14-5 15-14 1-4 1-31 1-79 0-70-1-72-3-77-3-5-7-7-18-8-4-1-5-1-5-5v-4l43-1c55-1 65 0 81 11 15 10 22 24 20 43-1 21-17 42-37 50-4 1-7 3-7 3 0 2 17 28 28 43 15 21 27 32 36 37 4 2 9 3 10 3 3 0 3 1 3 4s-1 5-2 5c-5 2-19 2-26 0zm-57-109c14-7 22-18 23-35 1-13-2-22-10-30-9-10-25-14-48-12l-10 1v39c0 36 0 40 2 40 1 0 9 1 18 0 14 0 17-1 24-4z" />
                <path d="m321 228c-25-4-34-20-32-61 1-21 3-30 11-38 7-7 13-9 25-10 13-1 21 2 29 8 5 4 9 10 9 13 0 1-3 2-6 4l-6 3-3-3c-5-6-9-9-14-11-10-3-20 2-25 11-3 5-3 6-3 29 0 22 0 25 3 29 4 7 12 11 21 10 13-1 20-10 20-24v-7h-10-10v-13h36v15c0 12-1 16-3 22-6 15-23 24-42 22z" />
              </g>
            </svg>
          )}
          {twitter && (
            <svg
              className="h-6 w-6 cursor-pointer fill-gray-400 hover:fill-[#1da1f2]"
              onClick={() => window.open(twitter, "_blank")}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          )}
          {email && (
            <svg
              className="h-6 w-6 cursor-pointer fill-gray-400 hover:fill-red-400"
              onClick={() => window.open("mailto:"+email)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12.042 23.648c-7.813 0-12.042-4.876-12.042-11.171 0-6.727 4.762-12.125 13.276-12.125 6.214 0 10.724 4.038 10.724 9.601 0 8.712-10.33 11.012-9.812 6.042-.71 1.108-1.854 2.354-4.053 2.354-2.516 0-4.08-1.842-4.08-4.807 0-4.444 2.921-8.199 6.379-8.199 1.659 0 2.8.876 3.277 2.221l.464-1.632h2.338c-.244.832-2.321 8.527-2.321 8.527-.648 2.666 1.35 2.713 3.122 1.297 3.329-2.58 3.501-9.327-.998-12.141-4.821-2.891-15.795-1.102-15.795 8.693 0 5.611 3.95 9.381 9.829 9.381 3.436 0 5.542-.93 7.295-1.948l1.177 1.698c-1.711.966-4.461 2.209-8.78 2.209zm-2.344-14.305c-.715 1.34-1.177 3.076-1.177 4.424 0 3.61 3.522 3.633 5.252.239.712-1.394 1.171-3.171 1.171-4.529 0-2.917-3.495-3.434-5.246-.134z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurTeamCard;
