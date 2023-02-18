import { NextApiRequest, NextApiResponse } from "next";
import { fetchStrapiAPI } from "../../lib/strapiApi";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== (process.env.PREVIEW_SECRET || "secret-token")) {
    return res.status(401).json({ message: "Invalid token" });
  }
  
  let pageData;
  
  if (req.query.type === "blogs") {
    [pageData] = await Promise.all([fetchStrapiAPI("/blogs", {
      publicationState: "preview",
      filters: {
        slug: req.query.slug,
      },
      populate: "*"
    })])
    console.log(pageData)
  }

  if (!pageData) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  res.setPreviewData({});

  res.writeHead(307, { Location: `/blogs/${req.query.slug}` });
  res.end();
};