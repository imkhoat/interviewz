"use client"

import * as React from "react"
import { PageWrapperConfig, PageWrapperState } from "@/types/page-wrapper"
import { PageWrapperStateContext, PageWrapperStateDispatchContext } from "@/contexts/page-wrapper-state-context"
import { PageWrapperConfigContext, PageWrapperConfigDispatchContext } from "@/contexts/page-wrapper-config-context"


export function usePageWrapper() {

  const state = React.useContext(PageWrapperStateContext);
  const stateDispatch = React.useContext(PageWrapperStateDispatchContext);

  const config = React.useContext(PageWrapperConfigContext);
  const configDispatch = React.useContext(PageWrapperConfigDispatchContext);


  function initPageWrapperState() {
    if(stateDispatch)
    stateDispatch({type: 'INIT_PAGE_WRAPPER_STATE'})
  }

  function setupPageWrapperState(state: PageWrapperState) {
    if(stateDispatch)
    stateDispatch({type: 'SETUP_PAGE_WRAPPER_STATE', state})
  }

  function updatePageWrapperState(key: keyof PageWrapperState, value: any) {
    if(configDispatch)
    configDispatch({type: 'UPDATE_PAGE_WRAPPER_STATE', key, value})
  }

  function initPageWrapperConfig() {
    if(configDispatch)
    configDispatch({type: 'INIT_PAGE_WRAPPER_CONFIG'})
  }

  function setupPageWrapperConfig(config: PageWrapperConfig) {
    if(configDispatch)
    configDispatch({type: 'SETUP_PAGE_WRAPPER_CONFIG', config})
  }

  function updatePageWrapperConfig(key: keyof PageWrapperConfig, value: any) {
    if(configDispatch)
    configDispatch({type: 'UPDATE_PAGE_WRAPPER_CONFIG', key, value})
  }


  return {
    state,
    config,
    stateDispatch,
    configDispatch,
    initPageWrapperState,
    setupPageWrapperState,
    updatePageWrapperState,
    initPageWrapperConfig,
    setupPageWrapperConfig,
    updatePageWrapperConfig,
  }
}