"use client"

import React from 'react';
import PageWrapperHeader from "@/components/extends/page-wrapper-header";
import PageWrapperSidebar from "@/components/extends/page-wrapper-sidebar";
import { usePageWrapperReducer } from '@/reducers/use-page-wrapper-reducer';
import { PageWrapperStateContextProvider, PageWrapperStateDispatchContextProvider } from '@/contexts/page-wrapper-state-context';
import { PageWrapperConfigContextProvider, PageWrapperConfigDispatchContextProvider } from '@/contexts/page-wrapper-config-context';

export default function PageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {state, stateDispatch, config, configDispatch} = usePageWrapperReducer()

  return (
    <div className="page-wrapper w-full h-full grid grid-cols-12 gap-4">
      <PageWrapperStateContextProvider state={state}>
        <PageWrapperStateDispatchContextProvider dispatch={stateDispatch}>
          <PageWrapperConfigContextProvider config={config}>
            <PageWrapperConfigDispatchContextProvider dispatch={configDispatch}>
              <div className={config?.sidebar ? " col-span-3 bg-slate-50" : "hidden"}>
                {config?.sidebar ? <PageWrapperSidebar /> : null}
              </div>
              <div className={config?.sidebar ? " col-span-9 flex flex-col justify-start items-stretch gap-y-4" : "__main col-span-12 flex flex-col justify-start items-stretch"}>
                <div className={config?.header ? " bg-slate-50 border-b" : "hidden"}>
                  {config?.header ? <PageWrapperHeader /> : null}
                </div>
                <div className="__body bg-slate-50">
                  {children}
                </div>
              </div>
            </PageWrapperConfigDispatchContextProvider>
          </PageWrapperConfigContextProvider>
        </PageWrapperStateDispatchContextProvider>
      </PageWrapperStateContextProvider>
    </div>
  )
}