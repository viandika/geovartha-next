import "../styles/globals.css";
import "../styles/ckeditor.css";
import type { AppProps } from "next/app";
import LayoutWrapper from "../components/LayoutWrapper";
import { Analytics } from "@vercel/analytics/react";
import { createContext } from "react";
import { fetchStrapiAPI } from "../lib/strapiApi";
import App from "next/app";
import { ApiGlobalGlobal } from "./schemas";

// Store Strapi Global object in context
export const GlobalContext = createContext<ApiGlobalGlobal["attributes"]>({} as ApiGlobalGlobal["attributes"]);

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: AppProps["Component"];
  pageProps: { global: ApiGlobalGlobal };
}) {
  const { global } = pageProps;
  return (
    <GlobalContext.Provider value={global.attributes}>
      <LayoutWrapper>
        <Component {...pageProps} />
        <Analytics />
      </LayoutWrapper>
    </GlobalContext.Provider>
  );
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx: any): Promise<any> => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const globalRes = await fetchStrapiAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};
