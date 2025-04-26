import { LoginCredentials, SignupCredentials } from "@auth/types";
import { httpClient } from "@shared/lib/http-client";
import { useAuthStore } from "@auth/stores/auth-store";

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

  resetPassword: (email: string) => {
    return httpClient("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  changePassword: (data: { password: string; newPassword: string }) => {
    return httpClient("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });
  },
}; 