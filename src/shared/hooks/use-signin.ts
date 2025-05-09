import { useMutation } from "@tanstack/react-query";
import { signIn as signInApi } from "@shared/api/auth";

interface SignInData {
  email: string;
  password: string;
}

export const useSignIn = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: async (data: SignInData) => {
      return signInApi(data);
    },
    ...options,
  });
}; 