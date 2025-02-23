import React from "react";
import {
  DispatchAction,
  PageWrapperState,
  PageWrapperConfig,
} from "@/types/page-wrapper";
import PageWrapperHeader from "@/components/extends/page-wrapper-header";
import PageWrapperSidebar from "@/components/extends/page-wrapper-sidebar";
import { usePageWrapperReducer } from "@/reducers/use-page-wrapper-reducer";


interface PageWrapperContextType {
  state?: PageWrapperState;
  stateDispatch?: React.ActionDispatch<[action: DispatchAction]>;
  config?: PageWrapperConfig;
  configDispatch?: React.ActionDispatch<[action: DispatchAction]>;
}

export const PageWrapperContext =
  React.createContext<PageWrapperContextType>({});

export function PageWrapperContextProvider(payload: {
  children: React.ReactNode;
}) {
  const { state, stateDispatch, config, configDispatch } =
    usePageWrapperReducer();

  return (
    <div className="w-full h-full grid grid-cols-12 gap-4">
      <PageWrapperContext.Provider
        value={{ state, stateDispatch, config, configDispatch }}
      >
        <div className={config?.sidebar ? " col-span-3 bg-slate-50" : "hidden"}>
          {config?.sidebar ? <PageWrapperSidebar /> : null}
        </div>
        <div
          className={
            config?.sidebar
              ? " col-span-9 flex flex-col justify-start items-stretch gap-y-4"
              : "col-span-12 flex flex-col justify-start items-stretch"
          }
        >
          <div className={config?.header ? " border-b" : "hidden"}>
            {config?.header ? <PageWrapperHeader /> : null}
          </div>
          <div className="bg-slate-50"> {payload.children}</div>
        </div>
      </PageWrapperContext.Provider>
    </div>
  );
}
