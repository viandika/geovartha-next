import AbstractImages from "./AbstractImage";
import AbstractText from "./AbstractText";
import ReadMoreLink from "./ReadMoreLink";

const getBlockComponent = ({ __component, ...rest }: any, index: any) => {
  let Block;

  switch (__component) {
    case "shared.abstract-text":
      Block = AbstractText;
      break;
    case "shared.image":
      Block = AbstractImages;
      break;
    case "shared.read-more-link":
      Block = ReadMoreLink;
      break;
  }

  return Block ? <Block key={`index-${index}`} {...rest} /> : null;
};

const AbstractBlock = ({ blocks }: any) => {
  return <div>{blocks.map(getBlockComponent)}</div>;
};

AbstractBlock.defaultProps = {
  blocks: [],
};

export default AbstractBlock;
