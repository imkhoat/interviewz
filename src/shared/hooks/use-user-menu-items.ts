import { Bell, LogOut, Settings, User } from "lucide-react";

import { useAuthStore } from "@auth/stores/auth-store";
import { useRouter } from "next/navigation";

export const useUserMenuItems = () => {
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.push("/auth/login");
  };

  return [
    {
      label: "Profile Settings",
      icon: Settings,
      onClick: () => router.push("/settings/profile"),
    },
    {
      label: "Notifications",
      icon: Bell,
      onClick: () => router.push("/settings/notifications"),
    },
    {
      label: "Account",
      icon: User,
      onClick: () => router.push("/settings/account"),
    },
    {
      label: "Log out",
      icon: LogOut,
      onClick: handleLogout,
    },
  ];
}; 