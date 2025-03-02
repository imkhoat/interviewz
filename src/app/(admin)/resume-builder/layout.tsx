"use client";
import { Plus, Folder } from "lucide-react";
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
          icon: Folder,
          label: "View my resumes",
          variant: "outline",
          onClick: () => {
            console.log("Settings");
          },
        },
        {
          icon: Plus,
          label: "Create",
          onClick: () => {
            console.log("Download");
          },
        },
      ],
    });
  }, []);
  // #endregion

  return (
    <div className="min-h-screen min-w-screen h-screen w-screen container mx-auto">
      {children}
    </div>
  );
}
