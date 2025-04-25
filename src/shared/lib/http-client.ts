import { useAuthStore } from "@auth/stores/auth-store";
import { authService } from "@auth/services/auth.service";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const httpClient = async (url: string, options: RequestInit = {}) => {
  const authStore = useAuthStore.getState();
  const accessToken = authStore.accessToken;

  const headers = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers,
    });

    if (response.status === 401 && !url.includes("/auth/refresh")) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const data = await authService.refreshToken();
          authStore.setAuth(data);
          processQueue(null, data.accessToken);

          // Retry the original request
          const retryResponse = await fetch(`${baseUrl}${url}`, {
            ...options,
            headers: {
              ...headers,
              Authorization: `Bearer ${data.accessToken}`,
            },
          });

          if (!retryResponse.ok) {
            throw new Error("Failed to retry request after token refresh");
          }

          return retryResponse.json();
        } catch (error) {
          processQueue(error, null);
          authStore.clearAuth();
          throw error;
        } finally {
          isRefreshing = false;
        }
      } else {
        // Wait for the refresh to complete
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          return fetch(`${baseUrl}${url}`, {
            ...options,
            headers: {
              ...headers,
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json());
        });
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
