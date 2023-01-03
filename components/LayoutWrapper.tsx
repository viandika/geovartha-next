import { PageContainer } from "./PageContainer";
import { Navbar } from "./Navbar";
import React from "react";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageContainer>
      <Navbar />
      <main className="mb-auto">{children}</main>
    </PageContainer>
  );
};

export default LayoutWrapper;
