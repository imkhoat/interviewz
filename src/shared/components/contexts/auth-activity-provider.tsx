"use client";

import { useAuthActivity } from "@auth/hooks/use-auth-activity";

export function AuthActivityProvider({ children }: { children: React.ReactNode }) {
  useAuthActivity();
  return <>{children}</>;
} 