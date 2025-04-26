import { create } from "zustand";

import { PageWrapperConfig, PageWrapperState } from "@shared/types/page-wrapper";

interface PageWrapperStore {
  state: PageWrapperState;
  config: PageWrapperConfig;
  initPageWrapperState: () => void;
  setupPageWrapperState: (state: PageWrapperState) => void;
  updatePageWrapperState: (key: keyof PageWrapperState, value: PageWrapperState[keyof PageWrapperState]) => void;
  initPageWrapperConfig: () => void;
  setupPageWrapperConfig: (config: PageWrapperConfig) => void;
  updatePageWrapperConfig: (key: keyof PageWrapperConfig, value: PageWrapperConfig[keyof PageWrapperConfig]) => void;
}

const initialState: PageWrapperState = {
  title: "",
  description: "",
};

const initialConfig: PageWrapperConfig = {
  header: false,
  sidebar: false,
  footer: false,
  title: false,
  description: false,
};

export const usePageWrapperStore = create<PageWrapperStore>((set) => ({
  state: initialState,
  config: initialConfig,
  initPageWrapperState: () => set({ state: initialState }),
  setupPageWrapperState: (state) => set({ state: state }),
  updatePageWrapperState: (key, value) =>
    set((store) => ({ state: { ...store.state, [key]: value } })),
  initPageWrapperConfig: () => set({ config: initialConfig }),
  setupPageWrapperConfig: (config) => set({ config: config }),
  updatePageWrapperConfig: (key, value) =>
    set((store) => ({ config: { ...store.config, [key]: value } })),
})); 