'use client';

import { FormProfile } from "@/modules/setting/components/form-profile";
import { useGetUserProfile } from "@/modules/setting/queries/setting.queries";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useGetUserProfile(user?.id || "");

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return <FormProfile profile={profile} />;
} 