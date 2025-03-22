import React from "react";
import {
  DispatchAction,
  PageWrapperState,
  PageWrapperConfig,
} from "@/types/page-wrapper";
import PageWrapperHeader from "@/components/extends/page-wrapper-header";
import PageWrapperSidebar from "@/components/extends/page-wrapper-sidebar";
import { usePageWrapperReducer } from "@/reducers/use-page-wrapper-reducer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface PageWrapperContextType {
  state?: PageWrapperState;
  stateDispatch?: React.ActionDispatch<[action: DispatchAction]>;
  config?: PageWrapperConfig;
  configDispatch?: React.ActionDispatch<[action: DispatchAction]>;
}

export const PageWrapperContext = React.createContext<PageWrapperContextType>(
  {}
);

export function PageWrapperContextProvider(payload: {
  children: React.ReactNode;
}) {
  const { state, stateDispatch, config, configDispatch } =
    usePageWrapperReducer();

  return (
    <div className="w-full h-full min-h-screen min-w-screen">
      <PageWrapperContext.Provider
        value={{ state, stateDispatch, config, configDispatch }}
      >
        <SidebarProvider>
          {config?.sidebar ? <PageWrapperSidebar /> : null}
          <SidebarInset>
            <div
              className="flex flex-col justify-start items-stretch"
            >
              <div className={config?.header ? " border-b" : "hidden"}>
                {config?.header ? <PageWrapperHeader /> : null}
              </div>
              <div className="bg-slate-50 flex-grow">
                {" "}
                {payload.children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </PageWrapperContext.Provider>
    </div>
  );
}
