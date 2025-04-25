"use client"

import { usePageWrapperStore } from "@shared/stores/page-wrapper.store"

export function usePageWrapper() {
  const {
    state,
    config,
    initPageWrapperState,
    setupPageWrapperState,
    updatePageWrapperState,
    initPageWrapperConfig,
    setupPageWrapperConfig,
    updatePageWrapperConfig,
  } = usePageWrapperStore();

  return {
    state,
    config,
    initPageWrapperState,
    setupPageWrapperState,
    updatePageWrapperState,
    initPageWrapperConfig,
    setupPageWrapperConfig,
    updatePageWrapperConfig,
  }
}