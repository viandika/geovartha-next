const ReadMoreLink = ({Text, Link}: {Text: string, Link: string }) => {
  return (
    <a href={Link} target="_blank" rel="noreferrer" className="text-orange-400 hover:text-orange-500 text-base cursor-pointer">{Text}</a>
  )
}

export default ReadMoreLink