"use client";

import {
  DashboardSquare01Icon,
  UserGroupIcon,
  PackageIcon,
  Invoice03Icon,
  BoxesIcon,
  Notification03Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import type React from "react";
import { NavMain, type NavMainItem } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navMain: NavMainItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: DashboardSquare01Icon },
  { title: "Clients", url: "/clients", icon: UserGroupIcon },
  { title: "Produits", url: "/products", icon: PackageIcon },
  { title: "Factures", url: "/invoices", icon: Invoice03Icon },
  { title: "Stock", url: "/stock", icon: BoxesIcon },
  { title: "Alertes", url: "/alerts", icon: Notification03Icon },
  { title: "Audit", url: "/audit", icon: Shield01Icon },
];

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>,
): React.ReactElement {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-heading font-semibold text-sm">N</span>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">NovaERP</span>
                <span className="text-muted-foreground text-xs">
                  Gestion commerciale
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: "Salma", email: "salma@novaerp.ma" }} />
      </SidebarFooter>
    </Sidebar>
  );
}
