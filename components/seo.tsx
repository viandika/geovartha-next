import Head from "next/head";
import { Fragment, useContext } from "react";
import { GlobalContext } from "../pages/_app";
import { getStrapiMedia } from "../lib/strapiMedia";
import { ApiGlobalGlobal, SharedMetaSocial, SharedSeo } from "../pages/schemas";

const Seo = ({ seo }: { seo: SharedSeo["attributes"] }) => {
  const { defaultSeo, SiteName } = useContext<ApiGlobalGlobal["attributes"]>(GlobalContext);
  const seoWithDefaults: SharedSeo["attributes"] = {
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
      {fullSeo.metaViewport && <meta name="viewport" content={fullSeo.metaViewport} />}
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.metaImage && (
        <>
          <meta property="og:image" content={fullSeo.metaImage} />
          <meta name="image" content={fullSeo.metaImage} />
        </>
      )}
      {(fullSeo.metaSocial as SharedMetaSocial["attributes"][]).map((social) => {
        if (social.socialNetwork === "Twitter") {
          return (
            <Fragment key={social.title}>
              <meta name="twitter:title" content={social.title} />
              <meta name="twitter:description" content={social.description} />
              {social.image && <meta name="twitter:image" content={social.image} />}
            </Fragment>
          );
        } else if (social.socialNetwork === "Facebook") {
          return (
            <Fragment key={social.title}>
              <meta name="og:title" content={social.title} />
              <meta name="og:description" content={social.description} />
              {social.image && <meta name="og:image" content={social.image} />}
            </Fragment>
          );
        }
      })}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
export default Seo;
