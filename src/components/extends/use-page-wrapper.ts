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

  function initDropdownActions(payload: Action[]) {
    state.dropdownActions = payload
  }

  function addDropdownAction(payload: Action) {
    if (!state.dropdownActions) {
      state.dropdownActions = []
    }
    state.dropdownActions.push(payload)
  }

  function initPrimaryAction(payload: Action) {
    state.primaryAction = payload
  }

  function initSecondaryAction(payload: Action) {
    state.secondaryAction = payload
  }

  function initTitle(payload: {
    title: string
    description?: string
  }) {
    state.title = payload.title
    state.description = payload.description
  }

  /**
   * Setup the page wrapper with the given payload, combining mode
   * @param payload
   * @param pageConfig
   */
  function setupPageWrapper(payload: PageWrapperState, pageConfig?: PageWrapperConfig) {
    if (payload.title) {
      state.title = payload.title
    }
    if (payload.description) {
      state.description = payload.description
    }
    if (payload.dropdownActions) {
      state.dropdownActions = payload.dropdownActions
    }
    if (payload.primaryAction) {
      state.primaryAction = payload.primaryAction
    }
    if (payload.secondaryAction) {
      state.secondaryAction = payload.secondaryAction
    }
    if (payload.actions) {
      state.actions = payload.actions
    }
    if (payload.icon) {
      state.icon = payload.icon
    }
    if (payload.breadcrumbs) {
      state.breadcrumbs = payload.breadcrumbs
    }
    if (payload.menus) {
      state.menus = payload.menus.map((menu) => {
        return {
          variant: 'ghost',
          ...menu,
        }
      })
      config.menus = true
    }
    else {
      config.menus = false
    }

    if (payload.tabs) {
      state.tabs = payload.tabs.map((tabs) => {
        return {
          variant: 'ghost',
          ...tabs,
        }
      })
      config.tabs = true
    }
    else {
      config.tabs = false
    }

    if (payload.menuTitle) {
      state.menuTitle = payload.menuTitle
    }
    if (payload.menuDescription) {
      state.menuDescription = payload.menuDescription
    }
    if (pageConfig) {
      config = {
        ...config,
        ...pageConfig,
      }
    }
  }

  /**
   * Setup the page config with the given payload, combining mode
   * @param pageConfig
   */
  function setupPageConfig(pageConfig: PageWrapperConfig) {
    config = {
      ...config,
      ...pageConfig,
    }
  }

  /**
   * Initialize the page wrapper with the given payload, ovveriding mode
   * @param payload
   * @param pageConfig
   */
  function initPageWrapper(payload: PageWrapperState, pageConfig?: PageWrapperConfig) {
    state = payload

    if (pageConfig) {
      config = pageConfig
    }
  }

  /**
   * Initialize the page config with the given payload, ovveriding mode
   * @param pageConfig
   */
  function initPageConfig(pageConfig: PageWrapperConfig) {
    config = pageConfig
  }

  /**
   * Initialize the default page wrapper with the route meta
   */
  function initDefaultPageWrapper() {
    if (route.meta?.config?.title) {
      state.title = route.meta?.config?.title
    }
    if (route.meta?.config?.description) {
      state.description = route.meta?.config?.description
    }
    if (route.meta?.config?.icon) {
      state.icon = route.meta?.config?.icon
    }
  }

  // Modal logics

  function toggleModal() {
    modal.state = !modal.state
  }

  function setModalMode(payload: { title?: string, description?: string, mode?: MODAL_TYPE }) {
    modal.type = payload.mode
    modal.title = payload.title
    modal.description = payload.description
  }

  // Drawer logics
  function toggleDrawer() {
    drawer.state = !drawer.state
  }

  function setDrawerMode(payload: { mode: DRAWER_TYPE, title?: string, description?: string }) {
    drawer.mode = payload.mode
    drawer.title = payload.title
    drawer.description = payload.description
  }

  // Breadcrumb logic
  function initBreadcrumb() {
    const matchRoutes = route.matched

    state.breadcrumbs = new Map(matchRoutes.map((i) => {
      return [i.name?.toString(), {
        to: i.name,
        name: i.name?.toString(),
      }]
    }))
  }

  function changeBreadcrumb(key: string, payload: Breadcrumb) {
    state.breadcrumbs?.set(key, payload)
  }

  function removeBreadcrumb(key: string) {
    state?.breadcrumbs?.delete(key)
  }

  function setupBreadcrumbs(payload: Breadcrumb[] | Map<string, Breadcrumb>) {
    if (payload instanceof Map) {
      state.breadcrumbs = payload
    }
    else {
      state.breadcrumbs = new Map(payload.map((i) => {
        return [i.name?.toString(), {
          to: i.to,
          name: i.name,
        }]
      }))
    }
  }

  initBreadcrumb()
  initDefaultPageWrapper()

  return {
    config,
    state,
    initTitle,
    addDropdownAction,
    initDropdownActions,
    initPrimaryAction,
    initSecondaryAction,
    setupPageWrapper,
    initPageWrapper,
    setupPageConfig,
    initPageConfig,
    modal,
    toggleModal,
    setModalMode,
    drawer,
    toggleDrawer,
    setDrawerMode,
    changeBreadcrumb,
    setupBreadcrumbs,
    removeBreadcrumb,
  }
}