import { SettingTabs } from "@/modules/setting/components/setting-tabs";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <SettingTabs />
      <div className="mt-6">{children}</div>
    </div>
  );
} 