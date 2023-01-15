import Image, { StaticImageData } from "next/image";

type OurTeamCardProps = {
  image: StaticImageData;
  name: string;
  position: string;
  description: string;
};

const OurTeamCard = ({ image, name, position, description }: OurTeamCardProps) => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg bg-neutral-900 shadow-lg md:flex-row">
      <div className="h-80 w-full md:w-2/5">
        <Image className="h-full w-full object-cover object-center" src={image} alt={`${name} avatar`} />
      </div>
      <div className="w-full space-y-2 p-6 text-left md:w-3/5 md:p-4">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <span className="text-base text-gray-400 font-normal">{position}</span>
        <p className="text-base leading-relaxed text-gray-500 font-normal">{description}</p>
      </div>
    </div>
  );
};

export default OurTeamCard;
