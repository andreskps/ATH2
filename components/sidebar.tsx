import { LayoutDashboard, FileText, Settings, ShoppingCart } from "lucide-react"

import type { MainNavItem, SidebarNavItem } from "@/types"

interface DashboardConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Órdenes de Compra",
      href: "/ordenes-compra",
      icon: ShoppingCart,
      items: [],
    },
    {
      title: "Petición de Material",
      href: "/peticion-material",
      icon: FileText,
      items: [],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      items: [],
    },
  ],
}
