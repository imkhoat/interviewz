export interface Action {
  key?: string
  action?: () => void
  icon?: string | any
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'icon'
  size?: 'icon' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  label?: string
  loading?: boolean
}

export interface Menu extends Action {
  items?: Menu[]
  to?: any
}
export interface Tab extends Action {
  items?: Tab[]
  to?: any
}

export interface Breadcrumb {
  to?: any
  name: string
}

export interface PageWrapperState {
  title?: string
  description?: string
  actions?: (Action | Action[])[]
  dropdownActions?: Action[]
  primaryAction?: Action
  secondaryAction?: Action
  subDescription?: string
  icon?: string | any
  breadcrumbs?: Map<string | undefined, Breadcrumb>
  menus?: Menu[]
  tabs?: Tab[]
  menuTitle?: string
  menuDescription?: string
}

export interface PageWrapperConfig {
  header?: boolean
  title?: boolean
  description?: boolean
  sidebar?: boolean
  footer?: boolean
  actions?: boolean
  dropdownActions?: boolean
  primaryAction?: boolean
  secondaryAction?: boolean
  subDescription?: boolean
  icon?: boolean
  breadcrumbs?: boolean
  menus?: boolean
  tabs?: boolean
  menuMini?: boolean
}

export interface ApplicationSidebarState {
  menus: Menu[]
  mini?: boolean
  sheet?: boolean
  secondaryMenus?: Menu[]
}

export interface ApplicationSidebarConfig {
  menus: boolean
  mini?: boolean
  secondaryMenus: boolean
}

export interface PageWrapperModal {
  state?: boolean
  type?: any
  title?: string
  description?: string
}

export const dispatchActionType = {
  INIT_PAGE_WRAPPER_STATE: "INIT_PAGE_WRAPPER_STATE",
  SETUP_PAGE_WRAPPER_STATE: "SETUP_PAGE_WRAPPER_STATE",
  UPDATE_PAGE_WRAPPER_STATE: "UPDATE_PAGE_WRAPPER_STATE",
  INIT_PAGE_WRAPPER_CONFIG: "INIT_PAGE_WRAPPER_CONFIG",
  SETUP_PAGE_WRAPPER_CONFIG: "SETUP_PAGE_WRAPPER_CONFIG",
  UPDATE_PAGE_WRAPPER_CONFIG: "UPDATE_PAGE_WRAPPER_CONFIG",
} as const

export type DispatchActionType = typeof dispatchActionType

export type DispatchAction = {
  type: DispatchActionType["INIT_PAGE_WRAPPER_CONFIG"]
} | {
  type: DispatchActionType["SETUP_PAGE_WRAPPER_CONFIG"]
  config: PageWrapperConfig
} | {
  type: DispatchActionType["UPDATE_PAGE_WRAPPER_CONFIG"]
  key: keyof PageWrapperConfig,
  value: any
} | {
  type: DispatchActionType["INIT_PAGE_WRAPPER_STATE"]
} | {
  type: DispatchActionType["SETUP_PAGE_WRAPPER_STATE"]
  state: PageWrapperState
} | {
  type: DispatchActionType["UPDATE_PAGE_WRAPPER_STATE"]
  key: keyof PageWrapperState,
  value: any
}