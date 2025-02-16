import React from "react";
import { DispatchAction, PageWrapperState } from "@/types/page-wrapper";

export const PageWrapperStateContext = React.createContext<PageWrapperState | undefined>(undefined);

export const PageWrapperStateDispatchContext = React.createContext<React.ActionDispatch<[action: DispatchAction]> | null>(null)

export function PageWrapperStateContextProvider(payload: {state: PageWrapperState, children: React.ReactNode}) {
  return <>
    <PageWrapperStateContext.Provider value={payload.state}>
      {payload.children}
    </PageWrapperStateContext.Provider>
  </>
}

export function PageWrapperStateDispatchContextProvider(payload: {dispatch: React.ActionDispatch<[action: DispatchAction]>, children: React.ReactNode}) {
  return <>
    <PageWrapperStateDispatchContext.Provider value={payload.dispatch}>
      {payload.children}
    </PageWrapperStateDispatchContext.Provider>
  </>
}