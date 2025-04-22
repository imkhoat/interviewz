"use client"

import * as React from "react"
import { PageWrapperConfig, PageWrapperState } from "@shared/types/page-wrapper"
import { PageWrapperContext } from "@shared/components/contexts/page-wrapper-context"


export function usePageWrapper() {

  const { state, stateDispatch, config, configDispatch } = React.useContext(PageWrapperContext);


  function initPageWrapperState() {
    if (stateDispatch)
      stateDispatch({ type: 'INIT_PAGE_WRAPPER_STATE' })
  }

  function setupPageWrapperState(state: PageWrapperState) {
    if (stateDispatch)
      stateDispatch({ type: 'SETUP_PAGE_WRAPPER_STATE', state })
  }

  function updatePageWrapperState(key: keyof PageWrapperState, value: PageWrapperState[keyof PageWrapperState]) {
    if (configDispatch)
      configDispatch({ type: 'UPDATE_PAGE_WRAPPER_STATE', key, value })
  }

  function initPageWrapperConfig() {
    if (configDispatch)
      configDispatch({ type: 'INIT_PAGE_WRAPPER_CONFIG' })
  }

  function setupPageWrapperConfig(config: PageWrapperConfig) {
    if (configDispatch) {
      configDispatch({ type: 'SETUP_PAGE_WRAPPER_CONFIG', config })
    }

  }

  function updatePageWrapperConfig(key: keyof PageWrapperConfig, value: PageWrapperConfig[keyof PageWrapperConfig]) {
    if (configDispatch)
      configDispatch({ type: 'UPDATE_PAGE_WRAPPER_CONFIG', key, value })
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