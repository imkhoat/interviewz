"use client";

import React from "react";
import { PageWrapperContextProvider } from "@shared/components/contexts/page-wrapper-context";

export default function PageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <PageWrapperContextProvider>
      {children}
    </PageWrapperContextProvider>
  );
}
