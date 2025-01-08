"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Sample</SidebarHeader>
      <SidebarContent>{/* nav */}</SidebarContent>
      <SidebarFooter>
        {/* user
         */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
