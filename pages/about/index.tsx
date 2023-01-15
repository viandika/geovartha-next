import * as Separator from "@radix-ui/react-separator";
import OurTeamCard from "../../components/OurTeam/OurTeamCard";
import Izzul from "../../public/Izzul.jpg";

export default function AboutUs() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <h2 className="my-5 text-center text-5xl text-white">About Us</h2>
      <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
      <div className="whitespace-pre-wrap text-lg text-white">
        <p>
          GeoVartha, Geo means Earth in Greek + Vartha means Information in Sanskrit, is a community based research
          group which focuses on the geoscientific subject. We commit to explore and spread the most advanced
          development of geoscientific technology by keeping up with the technology development in the geoscientific
          subject and proposing solutions based on the continual R&D.
        </p>
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
        <p>
          Our goal is to establish a platform to assist geoscientists around the world to access the latest technology
          in geoscience research.
        </p>
      </blockquote>
      <section>
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mt-10 mb-6 grid gap-6 md:grid-cols-1 lg:mb-16">
            <OurTeamCard
              image={Izzul}
              name="Izzul Qudsi"
              position="Geoscientist / Group Coordinator"
              description="Izzul has 8+ years experiences  in oil & gas industry. He completed his bachelor's degree in Geological Engineering Universitas Padjajaran and master's degree in ITC Universiteit Twente. He is a geoscientist with expertise on the surface and subsurface workflow applications for geothermal and oil and gas exploration. Currently learning the implementation of machine learning on geoscientific subjects."
            />
            <OurTeamCard
              image={Izzul}
              name="Izzul Qudsi"
              position="Geoscientist / Group Coordinator"
              description="Izzul has 8+ years experiences  in oil & gas industry.."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
