"use client";

import { useEffect } from "react";
import { LogIn, KeyRound, SigmaIcon } from "lucide-react";
import { usePageWrapper } from "@/hooks/use-page-wrapper";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { setupPageWrapperConfig, setupPageWrapperState } = usePageWrapper();

  useEffect(() => {
    setupPageWrapperState({
      title: "Sign in to your account",
      description: "Enter your credentials to access your account",
      icon: LogIn,
      actions: [
        {
          label: "Sign up",
          variant: "default",
          onClick: () => router.push('/auth/signup'),
        },
      ],
    });
    setupPageWrapperConfig({
      header: true,
      sidebar: false,
      footer: false,
      title: true,
      description: true,
      icon: true,
      breadcrumbs: false
    });
  }, []);
  return (
    <main className="layout-auth grid grid-cols-12 justify-center items-center gap-1 min-h-screen min-w-screen container mx-auto p-2 md:p-0">
      <div className="col-span-12 sm:col-span-8 sm:col-start-3 md:col-span-6 md:col-start-4 xl:col-span-4 xl:col-start-5">
        {children}
      </div>
    </main>
  );
}
