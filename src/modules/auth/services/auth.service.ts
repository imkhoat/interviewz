import { LoginCredentials, AuthResponse } from "@auth/types";
import { authRepository } from "@auth/repositories/auth.repository";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      return await authRepository.login(credentials);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to login");
    }
  },

  logout: async (): Promise<void> => {
    try {
      await authRepository.logout();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to logout");
    }
  },

  refreshToken: async (): Promise<AuthResponse> => {
    try {
      return await authRepository.refreshToken();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to refresh token");
    }
  },
}; 