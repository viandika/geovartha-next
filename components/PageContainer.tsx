import React from "react";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen bg-neutral-800 font-sans">{children}</div>;
};
