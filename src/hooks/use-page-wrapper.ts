import { createContext, useContext } from 'react';
import type { Action, Breadcrumb, PageWrapperConfig, PageWrapperState, PageWrapperModal } from '@/types/page-wrapper'

export const PageWrapperContext = createContext<PageWrapperState>({});
export const PageWrapperConfigContext = createContext<PageWrapperConfig>({});
export const PageWrapperModalContext = createContext<PageWrapperModal>({});
export const PageWrapperDrawContext = createContext<PageWrapperModal>({});

export function usePageWrapper<MODAL_TYPE, DRAWER_TYPE>() {
  let state = useContext(PageWrapperContext)
  let config = useContext(PageWrapperConfigContext)
  let modal = useContext(PageWrapperModalContext)
  let drawer = useContext(PageWrapperDrawContext)

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  function generateState() {
    state.value = new Map()
    state.value.set('breadcrumb', [])
    state.value.set('sidebar', [])
    state.value.set('actions', [])
    state.value.set('menus', [])
    state.value.set('tabs', [])
    state.value.set('icon', '')
    state.value.set('title', '')
    state.value.set('description', '')
  }

  function generateConfig() {
    config.value = new Map()
    config.value.set('logo', true)
    config.value.set('icon', true)
    config.value.set('title', true)
    config.value.set('description', true)
    config.value.set('actions', true)
    config.value.set('menus', true)
    config.value.set('tabs', true)
    config.value.set('breadcrumb', true)
    config.value.set('sidebar', true)
    config.value.set('header', true)
  }
  /**
   * Setup page wrapper: override mode
   * @param statePayload 
   * @param configPayload
   * @param mode 'override' | 'merge'
   * @returns 
   */
  function initPageWrapper(statePayload: Partial<PayloadState>, configPayload?: Partial<Config>) {
    generateState()
    generateConfig()
    state.value.set('breadcrumb', initBreadcrumb())

    if (statePayload?.title) {
      loading.value.set('title', true)
      state.value.set('title', statePayload.title)
      loading.value.set('title', false)
    }

    if (statePayload?.description) {
      loading.value.set('description', true)
      state.value.set('description', statePayload.description)
      loading.value.set('description', false)
    }

    if (statePayload?.icon) {
      loading.value.set('icon', true)
      state.value.set('icon', statePayload.icon)
      loading.value.set('icon', false)
    }

    if (statePayload?.actions) {
      loading.value.set('actions', true)
      state.value.set('actions', statePayload.actions)
      loading.value.set('actions', false)
    }

    if (statePayload?.menus) {
      loading.value.set('menus', true)
      state.value.set('menus', statePayload.menus)
      loading.value.set('menus', false)
    }

    if (statePayload?.tabs) {
      loading.value.set('tabs', true)
      state.value.set('tabs', statePayload.tabs)
      loading.value.set('tabs', false)
    }

    if (statePayload?.breadcrumb) {
      loading.value.set('breadcrumb', true)
      state.value.set('breadcrumb', setupBreadcrumb(state.value.get('breadcrumb')))
      loading.value.set('breadcrumb', false)
    }

    if (statePayload?.sidebar) {
      loading.value.set('sidebar', true)
      state.value.set('sidebar', initSidebar(statePayload.sidebar))
      loading.value.set('sidebar', false)
    }

    if (configPayload) {
      Object.keys(configPayload).forEach(key => {
        config.value.set(key, configPayload[key as keyof Config])
      })
    }
  }

  /**
   * Setup page wrapper: override mode
   * @param statePayload 
   * @param configPayload
   * @param mode 'override' | 'merge'
   * @returns 
   */
  function setupPageWrapper(statePayload: Partial<PayloadState>, configPayload?: Partial<Config>, mode: 'override' | 'merge' = 'merge') {
    if (mode === 'merge') {
      if (!state.value || state.value.size === 0) {
        generateState()
      }
      if (!config.value || config.value.size === 0) {
        generateConfig()
      }
      if (statePayload?.title) {
        loading.value.set('title', true)
        state.value.set('title', statePayload.title)
        loading.value.set('title', false)
      }

      if (statePayload?.description) {
        loading.value.set('description', true)
        state.value.set('description', statePayload.description)
        loading.value.set('description', false)
      }

      if (statePayload?.icon) {
        loading.value.set('icon', true)
        state.value.set('icon', statePayload.icon)
        loading.value.set('icon', false)
      }

      if (statePayload?.actions) {
        loading.value.set('actions', true)
        state.value.set('actions', [...state.value.get('actions'), ...statePayload.actions])
        loading.value.set('actions', false)
      }

      if (statePayload?.menus) {
        loading.value.set('menus', true)
        state.value.set('menus', [...state.value.get('menus'), ...statePayload.menus])
        loading.value.set('menus', false)
      }

      if (statePayload?.tabs) {
        loading.value.set('tabs', true)
        state.value.set('tabs', [...state.value.get('menus'), ...statePayload.tabs])
        loading.value.set('tabs', false)
      }

      if (statePayload?.breadcrumb) {
        loading.value.set('breadcrumb', true)
        state.value.set('breadcrumb', setupBreadcrumb(statePayload?.breadcrumb))
        loading.value.set('breadcrumb', false)
      }

      if (statePayload?.sidebar) {
        loading.value.set('sidebar', true)
        state.value.set('sidebar', addSidebar(state.value.get('sidebar'), statePayload.sidebar))
        loading.value.set('sidebar', false)
      }
    } else {
      generateState()
      generateConfig()
      state.value.set('breadcrumb', initBreadcrumb())

      if (statePayload?.title) {
        loading.value.set('title', true)
        state.value.set('title', statePayload.title)
        loading.value.set('title', false)
      }

      if (statePayload?.description) {
        loading.value.set('description', true)
        state.value.set('description', statePayload.description)
        loading.value.set('description', false)
      }

      if (statePayload?.icon) {
        loading.value.set('icon', true)
        state.value.set('icon', statePayload.icon)
        loading.value.set('icon', false)
      }

      if (statePayload?.actions) {
        loading.value.set('actions', true)
        state.value.set('actions', statePayload.actions)
        loading.value.set('actions', false)
      }

      if (statePayload?.menus) {
        loading.value.set('menus', true)
        state.value.set('menus', statePayload.menus)
        loading.value.set('menus', false)
      }

      if (statePayload?.tabs) {
        loading.value.set('tabs', true)
        state.value.set('tabs', statePayload.tabs)
        loading.value.set('tabs', false)
      }

      if (statePayload?.breadcrumb) {
        loading.value.set('breadcrumb', true)
        state.value.set('breadcrumb', setupBreadcrumb(state.value.get('breadcrumb')))
        loading.value.set('breadcrumb', false)
      }

      if (statePayload?.sidebar) {
        loading.value.set('sidebar', true)
        state.value.set('sidebar', initSidebar(statePayload.sidebar))
        loading.value.set('sidebar', false)
      }
    }

    if (configPayload) {
      Object.keys(configPayload).forEach(key => {
        config.value.set(key, configPayload[key as keyof Config])
      })
    }
  }

  /**
   * Update state or config value
   * @param key 
   * @param value 
   * @param obj 
   */
  function updatePageWrapper(key: string, value: any, obj: 'state' | 'config' = 'state') {
    if (obj === 'state') {
      loading.value.set(key, true)
      state.value.set(key, value)
      loading.value.set(key, false)
    } else {
      config.value.set(key, value)
    }
  }

  /**
   * Update state or config value
   * @param key 
   * @param value 
   * @param obj 
   */
  function updatePageWrappers(payload: Record<string, any>, obj: 'state' | 'config' = 'state') {
    if (obj === 'state') {
      for (const key in payload) {
        loading.value.set(key, true)
        state.value.set(key, payload[key])
        loading.value.set(key, false)
      }
    } else {
      for (const key in payload) {
        config.value.set(key, payload[key])
      }
    }
  }

  /**
   * Get state or config value by key
   * @param key 
   * @param obj 
   * @returns 
   */
  function getState(key: string) {
    return state.value.get(key)
  }

  function getConfig(key: string) {
    return config.value.get(key)
  }

  return {
    state,
    config,
    getState,
    getConfig,
    initPageWrapper,
    setupPageWrapper,
    updatePageWrapper,
    updatePageWrappers,
    addSidebar,
    initSidebar,
    initBreadcrumb,
    setupBreadcrumb,
  }
}