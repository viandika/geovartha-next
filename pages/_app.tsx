import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutWrapper from "../components/LayoutWrapper";
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutWrapper>
      <Component {...pageProps} />
      <Analytics />
    </LayoutWrapper>
  );
}
