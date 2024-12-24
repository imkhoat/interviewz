import { useContext } from 'react';
import PageWrapperHeader from "@/components/extends/page-wrapper-header";

export default function PageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page-wrapper w-full h-full grid grid-cols-12 gap-4">
      <div className="__sidebar col-span-3 bg-slate-50">

      </div>
      <div className="__main col-span-9 flex flex-col justify-start items-stretch space-y-4">
        <div className="__header bg-slate-50">
          <PageWrapperHeader />
        </div>
        <div className="__body bg-slate-50">
          {children}
        </div>
      </div>
    </div>
  )
}