import Head from "next/head";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";
import { getStrapiMedia } from "../lib/strapiMedia";
import { ApiGlobalGlobal, SharedSeo } from "../pages/schemas";

const Seo = ({ seo }: { seo: SharedSeo }) => {
  const { defaultSeo, SiteName } = useContext<ApiGlobalGlobal["attributes"]>(GlobalContext);
  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  };
  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: `${seoWithDefaults.metaTitle} | ${SiteName}`,
    // Get full image URL
    metaImage: getStrapiMedia(seoWithDefaults.metaImage),
  };

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.metaImage && (
        <>
          <meta property="og:image" content={fullSeo.metaImage} />
          <meta name="twitter:image" content={fullSeo.metaImage} />
          <meta name="image" content={fullSeo.metaImage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;
