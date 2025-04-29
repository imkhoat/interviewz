import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { settingRepository } from "@setting/repositories/setting.repository";
import { useAuthStore } from "@auth/stores/auth-store";

export const settingKeys = {
  all: ["settings"] as const,
  profile: (userId: string) => [...settingKeys.all, "profile", userId] as const,
};

export const useGetUserProfile = (userId: string) => {
  return useQuery({
    queryKey: settingKeys.profile(userId),
    queryFn: () => settingRepository.getUserProfile(userId),
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: (data: Parameters<typeof settingRepository.updateUserProfile>[1]) =>
      settingRepository.updateUserProfile(user?.id || "", data),
    onSuccess: (data) => {
      queryClient.setQueryData(settingKeys.profile(user?.id || ""), data);
    },
  });
}; 