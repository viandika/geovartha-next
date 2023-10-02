import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={`min-h-screen bg-neutral-800 font-sans ${roboto.variable} font-sans`}>{children}</div>;
};
