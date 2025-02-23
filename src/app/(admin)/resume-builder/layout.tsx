"use client";

import { useEffect } from "react";
import { usePageWrapper } from "@/hooks/use-page-wrapper";

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setupPageWrapperConfig } = usePageWrapper();

  // #region mounted effect
  useEffect(() => {
    setupPageWrapperConfig({
      header: true,
      sidebar: false,
      footer: false,
      title: false,
      description: false,
    });
  }, []);
  // #endregion

  return <div className="min-h-screen min-w-screen h-screen w-screen container mx-auto">{children}</div>;
}
