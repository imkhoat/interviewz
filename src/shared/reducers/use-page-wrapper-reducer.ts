import { DispatchAction, PageWrapperConfig, PageWrapperState } from "@shared/types/page-wrapper";
import React from "react";

export function usePageWrapperReducer(){

  function stateReducer(state: PageWrapperState, action: DispatchAction) {
    switch (action.type) {
      case "INIT_PAGE_WRAPPER_STATE":
        return {
          ...state,
        }
      case "SETUP_PAGE_WRAPPER_STATE":
        return {
          ...state,
          ...action.state,
        }
      case "UPDATE_PAGE_WRAPPER_STATE":
        return {
          ...state,
        }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  const initState: PageWrapperState = {
    title: "",
    description: "",
  }

  const [state, stateDispatch] = React.useReducer(stateReducer, initState)

  function configReducer(config: PageWrapperConfig, action: DispatchAction) {
    switch (action.type) {
      case "INIT_PAGE_WRAPPER_CONFIG":
        return {
          ...config,
        }
      case "SETUP_PAGE_WRAPPER_CONFIG":
        return {
          ...config,
          ...action.config,
        }
      case "UPDATE_PAGE_WRAPPER_CONFIG":
        return {
          ...config,
        }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  const initConfig = {
    header: false,
    sidebar: false,
    footer: false,
    title: false,
    description: false,
  }
  const [config, configDispatch] = React.useReducer(configReducer, initConfig)

  return {
    state,
    stateDispatch,
    config,
    configDispatch
  }
}