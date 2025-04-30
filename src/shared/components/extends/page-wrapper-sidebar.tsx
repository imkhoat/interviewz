"use client"

import * as React from "react"

import { NavMain } from "@shared/components/extends/page-wrapper-nav-main"
import { NavProjects } from "@shared/components/extends/page-wrapper-nav-secondary"
import { TeamSwitcher } from "@shared/components/extends/page-wrapper-nav-team-switch"
import { NavUser } from "@shared/components/extends/page-wrapper-nav-user"
import { SidebarCollapseTrigger } from "@shared/components/ui/sidebar-collapse-trigger"
import { useSidebarItems } from "@shared/hooks/use-sidebar-items";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@shared/components/ui/sidebar"

export default function PageWrapperSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { navMain, projects, teams } = useSidebarItems();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarCollapseTrigger />
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: "John Doe",
          email: "john@example.com",
          avatar: "/avatars/john.jpg"
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}
