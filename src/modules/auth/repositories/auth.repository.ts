import { LoginCredentials, SignupCredentials } from "@auth/types";
import { httpClient } from "@shared/lib/http-client";
import { useAuthStore } from "../stores/auth-store";

export const authRepository = {
  login: (credentials: LoginCredentials) => {
    const deviceId = useAuthStore.getState().deviceId;
    return httpClient("/auth/login", {
      method: "POST",
      body: JSON.stringify({ ...credentials, deviceId }),
    });
  },

  signup: (credentials: SignupCredentials) => {
    const deviceId = useAuthStore.getState().deviceId;
    return httpClient("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ ...credentials, deviceId }),
    });
  },

  logout: () => {
    const deviceId = useAuthStore.getState().deviceId;
    return httpClient("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ deviceId }),
      credentials: "include",
    });
  },

  refreshToken: () => {
    const deviceId = useAuthStore.getState().deviceId;
    return httpClient("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ deviceId }),
      credentials: "include",
    });
  },
}; 