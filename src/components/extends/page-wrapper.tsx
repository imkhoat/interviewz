"use client"

import { useContext } from 'react';
import { usePageWrapper } from '@/hooks/use-page-wrapper';
import PageWrapperHeader from "@/components/extends/page-wrapper-header";
import PageWrapperSidebar from "@/components/extends/page-wrapper-sidebar";

export default function PageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { PageWrapperStateContext, PageWrapperConfigContext } = usePageWrapper();
  const state = useContext(PageWrapperStateContext);
  const config = useContext(PageWrapperConfigContext);

  return (
    <div className="page-wrapper w-full h-full grid grid-cols-12 gap-4">
      <div className={config?.sidebar ? " col-span-3 bg-slate-50" : "hidden"}>
        { config?.sidebar ? <PageWrapperSidebar /> : null }
      </div>
      <div className={config?.sidebar ? " col-span-9 flex flex-col justify-start items-stretch space-y-4" : "__main col-span-12 flex flex-col justify-start items-stretch space-y-4"}>
        <div className={config?.header ? " bg-slate-50": "hidden"}>
          { config?.header ? <PageWrapperHeader /> : null }
        </div>
        <div className="__body bg-slate-50">
          {children}
        </div>
      </div>
    </div>
  )
}