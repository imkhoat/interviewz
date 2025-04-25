import { setCookie, removeCookie } from 'typescript-cookie';
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthResponse } from "../types";

interface AuthState {
  user: AuthResponse["user"] | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (auth: AuthResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (auth) => {
        const payload = {
          user: auth.user,
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
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
          isAuthenticated: false,
        })
        removeCookie("auth-storage");
      },
    }),
    {
      name: "auth-storage",
    }
  )
); 