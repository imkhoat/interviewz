import { setCookie, removeCookie } from 'typescript-cookie';
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthResponse } from "../types";

interface AuthState {
  user: AuthResponse["user"] | null;
  accessToken: string | null;
  refreshToken: string | null;
  deviceId: string | null;
  lastActivity: number | null;
  isAuthenticated: boolean;
  setAuth: (auth: AuthResponse) => void;
  clearAuth: () => void;
  updateLastActivity: () => void;
}

const generateDeviceId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      deviceId: null,
      lastActivity: null,
      isAuthenticated: false,
      setAuth: (auth) => {
        const deviceId = generateDeviceId();
        const payload = {
          user: auth.user,
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
          deviceId,
          lastActivity: Date.now(),
          isAuthenticated: true,
        }
        set(payload)
        setCookie("auth-storage", JSON.stringify({ state: payload }));
      },
      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          deviceId: null,
          lastActivity: null,
          isAuthenticated: false,
        })
        removeCookie("auth-storage");
      },
      updateLastActivity: () => {
        set((state) => ({
          ...state,
          lastActivity: Date.now(),
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
); 