"use client"

import * as React from "react"

interface PageWrapperState {

}

interface PageWrapperConfig {
  header: boolean;
  sidebar: boolean;
  footer: boolean;
  title: boolean;
  description: boolean;
}

const PageWrapperStateContext = React.createContext<PageWrapperState | undefined>(undefined);
const PageWrapperConfigContext = React.createContext<PageWrapperConfig>({
  header: true,
  sidebar: true,
  footer: true,
  title: true,
  description: true,
});

export function usePageWrapper() {

  function setPageWrapperState() {

  }

  function setupPageWrapperConfig(config: PageWrapperConfig) {
    return {
      header: config.header,
      sidebar: config.sidebar,
      footer: config.footer,
      title: config.title,
      description: config.description,
    }

  }
  
  return {
    PageWrapperStateContext,
    PageWrapperConfigContext,
    setPageWrapperState,
  }
}