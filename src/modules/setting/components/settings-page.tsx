"use client";

import { Settings } from "lucide-react";
import { useEffect } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/components/ui/tabs";
import { usePageWrapper } from "@shared/hooks/use-page-wrapper";

import { GeneralSettingsForm } from "@setting/components/general-settings-form";
import { SecuritySettingsForm } from "@setting/components/security-settings-form";
import { NotificationSettingsForm } from "@setting/components/notification-settings-form";

export function SettingsPage() {
  const { setupPageWrapperConfig, setupPageWrapperState } = usePageWrapper();

  useEffect(() => {
    setupPageWrapperConfig({
      header: true,
      sidebar: true,
      footer: false,
      title: true,
      description: true,
      icon: true,
      breadcrumbs: true,
      logo: true
    });
    setupPageWrapperState({
      title: "Settings",
      description: "Manage your account settings and preferences",
      icon: Settings
    });
  }, []);

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage your general account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GeneralSettingsForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your security preferences and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SecuritySettingsForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationSettingsForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
} 