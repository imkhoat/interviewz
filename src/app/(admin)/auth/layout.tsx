"use client";

import { LogIn } from "lucide-react";
import { useEffect } from "react";

import { usePageWrapper } from "@shared/hooks/use-page-wrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setupPageWrapperConfig, setupPageWrapperState } = usePageWrapper();

  useEffect(() => {
    setupPageWrapperState({
      title: "Sign in to your account",
      description: "Enter your credentials to access your account",
      icon: LogIn,
    });
    setupPageWrapperConfig({
      header: true,
      sidebar: false,
      footer: false,
      title: false,
      description: false,
      icon: false,
      breadcrumbs: false,
      logo: true
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
