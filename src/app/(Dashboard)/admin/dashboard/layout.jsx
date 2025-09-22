"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

const sidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconChartBar,
    },
    {
      title: "Products",
      url: "/admin/dashboard/products",
      icon: IconListDetails,
    },
    {
      title: "Sale",
      url: "/admin/dashboard/sale",
      icon: IconFolder,
    },
    {
      title: "Purchase",
      url: "/admin/dashboard/purchase",
      icon: IconFileWord,
    },
    {
      title: "Customers",
      url: "/admin/dashboard/customers",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
};

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" data={sidebarData} />
      <SidebarInset>
        <SiteHeader />
        <div className="md:p-4 p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
