import { ElementType, ReactElement, ReactNode } from 'react'

import { MenuItem } from "@shared/components/extends/dropdown-menu-wrapper"
import { ButtonProps } from "@shared/components/ui/button"

export interface Action extends ButtonProps, MenuItem {
  key?: string
  action?: () => void
  icon?: string | ReactNode | React.ElementType
  disabled?: boolean
  label: string
  loading?: boolean
}

export interface Menu extends Action {
  items?: Menu[]
  to?: Record<string, string>
}
export interface Tab extends Action {
  items?: Tab[]
  to?: Record<string, string>
}

export interface Breadcrumb {
  to?: Record<string, string>
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
  icon?: ReactNode | ReactElement | ElementType
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
  logo?: boolean
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

export interface PageWrapperModal<T> {
  state?: boolean
  type?: T
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
  value: PageWrapperConfig[keyof PageWrapperConfig]
} | {
  type: DispatchActionType["INIT_PAGE_WRAPPER_STATE"]
} | {
  type: DispatchActionType["SETUP_PAGE_WRAPPER_STATE"]
  state: PageWrapperState
} | {
  type: DispatchActionType["UPDATE_PAGE_WRAPPER_STATE"]
  key: keyof PageWrapperState,
  value: PageWrapperState[keyof PageWrapperState]
}