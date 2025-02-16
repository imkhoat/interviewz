import React from "react";
import { DispatchAction, PageWrapperConfig } from "@/types/page-wrapper";

export const PageWrapperConfigContext = React.createContext<PageWrapperConfig | undefined>({
  header: false,
  sidebar: false,
  footer: false,
  title: false,
  description: false,
});

export const PageWrapperConfigDispatchContext = React.createContext<React.ActionDispatch<[action: DispatchAction]> | null>(null)

export function PageWrapperConfigContextProvider(payload: {config: PageWrapperConfig, children: React.ReactNode}) {
  return <>
    <PageWrapperConfigContext.Provider value={payload.config}>
      {payload.children}
    </PageWrapperConfigContext.Provider>
  </>
}

export function PageWrapperConfigDispatchContextProvider(payload: {dispatch: React.ActionDispatch<[action: DispatchAction]>, children: React.ReactNode}) {
  return <>
    <PageWrapperConfigDispatchContext.Provider value={payload.dispatch}>
      {payload.children}
    </PageWrapperConfigDispatchContext.Provider>
  </>
}