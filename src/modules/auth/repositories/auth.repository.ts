import { httpClient } from "@shared/lib/http-client";
import { LoginCredentials, SignupCredentials } from "@auth/types";

export const authRepository = {
  login: (credentials: LoginCredentials) => {
    return httpClient("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  signup: (credentials: SignupCredentials) => {
    return httpClient("/auth/signup", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  logout: () => {
    return httpClient("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  },

  refreshToken: () => {
    return httpClient("/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
  },
}; 