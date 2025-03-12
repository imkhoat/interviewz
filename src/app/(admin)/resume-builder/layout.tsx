"use client";
import { Save, Download } from "lucide-react";
import { useEffect } from "react";
import { usePageWrapper } from "@/hooks/use-page-wrapper";

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
      sidebar: false,
      footer: false,
      title: true,
      description: true,
      icon: false,
      logo: true,
    });
    setupPageWrapperState({
      title: "Resume Builder",
      description: "Create your resume in minutes",
      actions: [
        {
          icon: Download,
          label: "Download resume",
          variant: "outline",
          onClick: () => {
            console.log("Settings");
          },
        },
        {
          icon: Save,
          label: "Save",
          onClick: () => {
            console.log("Download");
          },
        },
      ],
    });
  }, []);
  // #endregion

  return (
    <div className="min-w-screen h-viewport max-h-viewport py-8 w-screen container mx-auto">
      {children}
    </div>
  );
}
