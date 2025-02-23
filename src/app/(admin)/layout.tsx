'use client';

import { usePageWrapper } from '@/hooks/use-page-wrapper';
import { useEffect } from 'react';

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
        title: false,
        description: false,
        icon: false,
      });
      setupPageWrapperState({
        title: "Resume Builder",
        description: "Create your resume in minutes",
        actions: [
          {
            icon: "CogIcon",
            label: "Settings",
            variant: 'outline',
            onClick: () => {
              console.log("Settings");
            },
          },
          {
            icon: "DownloadIcon",
            label: "Download",
            onClick: () => {
              console.log("Download");
            },
          }
        ]
      });
    }, []);
    // #endregion
  return (
    <div className="min-h-screen min-w-screen h-screen w-screen">
        {children}
    </div>
  )
}