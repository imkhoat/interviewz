"use client";
import { Save, Download } from "lucide-react";
import { useEffect } from "react";

import { usePageWrapper } from "@shared/hooks/use-page-wrapper";

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setupPageWrapperConfig, setupPageWrapperState } = usePageWrapper();

  // #region mounted effect
  useEffect(() => {
    setupPageWrapperConfig({
      header: true,
      sidebar: true,
      footer: false,
      title: true,
      description: true,
      icon: false,
      logo: false,
    });
    setupPageWrapperState({
      title: "Resume Builder",
      description: "Create your resume in minutes",
    });
  }, []);
  // #endregion

  return (
    <div className="h-viewport max-h-viewport py-8">
      {children}
    </div>
  );
}
