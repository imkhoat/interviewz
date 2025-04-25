"use client";

import React from "react";

import PageWrapperHeader from "@shared/components/extends/page-wrapper-header";
import PageWrapperSidebar from "@shared/components/extends/page-wrapper-sidebar";
import { SidebarInset, SidebarProvider } from "@shared/components/ui/sidebar";
import { usePageWrapperStore } from "@shared/stores/page-wrapper.store";

export default function PageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = usePageWrapperStore((state) => state.config);

  return (
    <div className="w-full h-full min-h-screen min-w-screen">
      <SidebarProvider>
        {config?.sidebar ? <PageWrapperSidebar /> : null}
        <SidebarInset>
          <div className="flex flex-col justify-start items-stretch">
            <div className={config?.header ? " border-b" : "hidden"}>
              {config?.header ? <PageWrapperHeader /> : null}
            </div>
            <div className="bg-slate-50 flex-grow"> {children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
