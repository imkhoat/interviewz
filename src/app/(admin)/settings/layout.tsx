import { SettingTabs } from "@setting/components/setting-tabs";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <SettingTabs />
      <div className="mt-6">{children}</div>
    </div>
  );
} 