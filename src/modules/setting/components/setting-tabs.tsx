'use client';

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  {
    value: "profile",
    label: "Profile",
  },
  {
    value: "security",
    label: "Security",
  },
  {
    value: "notification",
    label: "Notification",
  },
];

export function SettingTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname.split("/").pop() || "profile";

  const handleTabChange = (value: string) => {
    router.push(`/settings/${value}`);
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
} 