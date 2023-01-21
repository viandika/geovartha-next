import * as Separator from "@radix-ui/react-separator";
import OurTeamCard from "../../components/OurTeam/OurTeamCard";
import { ApiAboutPageAboutPage, SharedOurTeamCard } from "../schemas";
import { fetchStrapiAPI } from "../../lib/strapiApi";

export default function AboutUs({ aboutUs }: { aboutUs: ApiAboutPageAboutPage }) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <h2 className="my-5 text-center text-5xl text-white">About Us</h2>
        <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
        <div className="whitespace-pre-wrap text-lg text-white">
          <p>{aboutUs.attributes.AboutUs}</p>
        </div>
        <blockquote className="mt-20 text-2xl font-bold italic text-gray-900 dark:text-white">
          <svg
            aria-hidden="true"
            className="h-10 w-10 text-gray-400 dark:text-gray-600"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <p>{aboutUs.attributes.Quote}</p>
        </blockquote>
      </div>
        <section>
          <h2 className="mt-10 text-center text-5xl text-white">Our Team</h2>
          <Separator.Root className=" mx-auto mb-2 mt-5 h-1 w-full bg-neutral-100 max-w-3xl xl:max-w-5xl" />
          <div className="py-2 px-4 lg:py-8 lg:px-6">
            <div className="mx-auto mt-10 mb-6 grid gap-6 grid-cols-1 lg:grid-cols-2 lg:mb-16 lg:max-w-[100rem]">
              {aboutUs.attributes.Teams.map((team: SharedOurTeamCard["attributes"]) => {
                return (
                  <OurTeamCard
                    key={team.FullName}
                    image={team.Picture}
                    name={team.FullName}
                    position={team.Position}
                    description={team.Description}
                    linkedin={team.LinkedinLink}
                    github={team.GithubLink}
                    researchGate={team.ResearchGateLink}
                    twitter={team.TwitterLink}
                    email={team.Email}
                  />
                );
              })}
            </div>
          </div>
        </section>
    </>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [aboutUsRes] = await Promise.all([
    fetchStrapiAPI("/about-page", {
      populate: {
        Teams: {
          populate: ["Picture"],
        },
      },
    }),
  ]);
  return {
    props: {
      aboutUs: aboutUsRes.data,
    },
  };
}
