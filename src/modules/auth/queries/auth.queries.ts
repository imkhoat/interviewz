import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authService } from "@auth/services/auth.service";
import { useAuthStore } from "@auth/stores/auth-store";
import { toast } from "@shared/hooks/use-toast";
import { authRepository } from "@auth/repositories/auth.repository";

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data);
      queryClient.setQueryData(["auth", "user"], data.user);
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to login",
      });
    },
  });
};

export const useSignup = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      setAuth(data);
      queryClient.setQueryData(["auth", "user"], data.user);
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to signup",
      });
    },
  });
};

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      router.push("/auth/login");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to logout",
      });
    },
  });
};

export const useRefreshToken = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (data) => {
      setAuth(data);
      queryClient.setQueryData(["auth", "user"], data.user);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authRepository.resetPassword(email),
  });
}; 