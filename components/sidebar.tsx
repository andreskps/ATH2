"use client"

import type React from "react"

import { Calendar, FileText, LayoutDashboard, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

export default function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex-col space-y-4 py-4", className)} {...props}>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Panel</h2>
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname === "/dashboard" && "bg-muted text-primary",
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden group-hover:inline-block md:inline-block">Dashboard</span>
          </Link>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">PRODUCCIÓN</h2>
        <div className="space-y-1">
          <Link
            href="/turnos"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname?.startsWith("/turnos") && "bg-muted text-primary",
            )}
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden group-hover:inline-block md:inline-block">Turnos</span>
          </Link>
          <Link
            href="/peticion-material"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname?.startsWith("/peticion-material") && "bg-muted text-primary",
            )}
          >
            <FileText className="h-4 w-4" />
            <span className="hidden group-hover:inline-block md:inline-block">Peticiones de Material</span>
          </Link>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">COMPRAS</h2>
        <div className="space-y-1">
          <Link
            href="/ordenes-compra"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname?.startsWith("/ordenes-compra") && "bg-muted text-primary",
            )}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden group-hover:inline-block md:inline-block">Órdenes de Compra</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
