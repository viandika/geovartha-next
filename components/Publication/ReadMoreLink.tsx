const ReadMoreLink = ({ Text, Link }: { Text: string; Link: string }) => {
  return (
    <a
      href={Link}
      target="_blank"
      rel="noreferrer"
      className="cursor-pointer text-base text-orange-400 hover:text-orange-500"
    >
      {Text}
    </a>
  );
};

export default ReadMoreLink;
