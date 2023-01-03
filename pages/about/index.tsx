import * as Separator from "@radix-ui/react-separator";

export default function AboutUs() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <h2 className="my-5 text-center text-5xl text-white">About Us</h2>
      <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
      <p>
        <div className="whitespace-pre-wrap text-base text-white">
          GeoVartha, Geo means Earth in Greek + Vartha means Information in Sanskrit, is a community based research
          group which focuses on the geoscientific subject. We commit to explore and spread the most advanced
          development of geoscientific technology by keeping up with the technology development in the geoscientific
          subject and proposing solutions based on the continual R&D.
        </div>
      </p>
    </div>
  );
}
