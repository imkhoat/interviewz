"use client";

import { Bell, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@auth/stores/auth-store";
import { Avatar, AvatarFallback } from "@shared/components/ui/avatar";
import { Button } from "@shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import { useUserMenuItems } from "@shared/hooks/use-user-menu-items";

export default function PageWrapperAuthActions() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const menuItems = useUserMenuItems();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => router.push("/auth/login")}
          className="flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          Login
        </Button>
        <Button
          onClick={() => router.push("/auth/signup")}
          className="flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Register
        </Button>
      </div>
    );
  }

  const userInitials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`;

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon">
        <Bell className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.fullName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {menuItems.map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.onClick}>
              {item.icon && <item.icon className="mr-2 h-4 w-4" />}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 