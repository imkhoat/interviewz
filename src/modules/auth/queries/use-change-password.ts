import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authService } from "@auth/services/auth.service";
import { toast } from "@shared/hooks/use-toast";

export function useChangePassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your password has been changed successfully",
      });
      router.push("/auth/login");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    },
  });
} 