"use client"

import { useEffect } from "react";
import { useAuthStore } from "@auth/stores/auth-store";
import { useRefreshToken } from "@auth/queries/auth.queries";

const REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before token expires
const ACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes of inactivity

export const useAuthActivity = () => {
  const { updateLastActivity, lastActivity, accessToken } = useAuthStore();
  const { mutate: refreshToken } = useRefreshToken();

  useEffect(() => {
    const handleActivity = () => {
      updateLastActivity();
    };

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [updateLastActivity]);

  useEffect(() => {
    if (!accessToken || !lastActivity) return;

    const checkTokenExpiration = () => {
      const token = accessToken.split(".")[1];
      const payload = JSON.parse(atob(token));
      const expiresAt = payload.exp * 1000; // Convert to milliseconds
      const timeUntilExpiry = expiresAt - Date.now();

      if (timeUntilExpiry <= REFRESH_THRESHOLD) {
        refreshToken();
      }
    };

    const checkInactivity = () => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      if (timeSinceLastActivity >= ACTIVITY_TIMEOUT) {
        useAuthStore.getState().clearAuth();
      }
    };

    const tokenInterval = setInterval(checkTokenExpiration, 60000); // Check every minute
    const activityInterval = setInterval(checkInactivity, 60000); // Check every minute

    return () => {
      clearInterval(tokenInterval);
      clearInterval(activityInterval);
    };
  }, [accessToken, lastActivity, refreshToken]);
}; 