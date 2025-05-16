"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Boxes,
  Building2,
  Calendar,
  ClipboardList,
  Cog,
  Factory,
  FileText,
  Gauge,
  Home,
  Layers3,
  LayoutDashboard,
  PackageOpen,
  ShoppingCart,
  Truck,
  Users,
  Workflow,
  Activity,
  Shirt,
} from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="group flex h-full w-16 flex-col border-r bg-background transition-all hover:w-64 md:w-64">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Factory className="h-6 w-6" />
          <span className="hidden group-hover:inline-block md:inline-block">ATH Plásticos</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname === "/" && "bg-muted text-primary",
            )}
          >
            <Home className="h-4 w-4" />
            <span className="hidden group-hover:inline-block md:inline-block">Inicio</span>
          </Link>
          <Link
            href="/dashboard/oee"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname === "/dashboard/oee" && "bg-muted text-primary",
            )}
          >
            <Gauge className="h-4 w-4" />
            <span className="hidden group-hover:inline-block md:inline-block">Dashboard OEE</span>
          </Link>

          <div className="mt-6">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground hidden group-hover:block md:block">
              PRODUCCIÓN
            </h2>
            <Link
              href="/ordenes"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/ordenes") && "bg-muted text-primary",
              )}
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Órdenes de Producción</span>
            </Link>
            <Link
              href="/programacion"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/programacion") && "bg-muted text-primary",
              )}
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Programación</span>
            </Link>
            <Link
              href="/supervision"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/supervision") && "bg-muted text-primary",
              )}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Supervisión</span>
            </Link>
            <Link
              href="/turnos"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/turnos") && "bg-muted text-primary",
              )}
            >
              <Workflow className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Turnos</span>
            </Link>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground hidden group-hover:block md:block">
              COMERCIAL
            </h2>
            <Link
              href="/clientes"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/clientes") && "bg-muted text-primary",
              )}
            >
              <Building2 className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Clientes</span>
            </Link>
            <Link
              href="/proveedores"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/proveedores") && "bg-muted text-primary",
              )}
            >
              <Truck className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Proveedores</span>
            </Link>
            <Link
              href="/ordenes-compra"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/ordenes-compra") && "bg-muted text-primary",
              )}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Órdenes de Compra</span>
            </Link>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground hidden group-hover:block md:block">
              INVENTARIO
            </h2>
            <Link
              href="/productos"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/productos") && "bg-muted text-primary",
              )}
            >
              <Boxes className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Productos</span>
            </Link>
            <Link
              href="/materia-prima"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/materia-prima") && "bg-muted text-primary",
              )}
            >
              <PackageOpen className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Materia Prima</span>
            </Link>
            <Link
              href="/moldes"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/moldes") && "bg-muted text-primary",
              )}
            >
              <Layers3 className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Moldes</span>
            </Link>
            <Link
              href="/maquinaria"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/maquinaria") && pathname !== "/maquinaria/operacion" && "bg-muted text-primary",
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Maquinaria</span>
            </Link>
            <Link
              href="/maquinaria/operacion"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/maquinaria/operacion" && "bg-muted text-primary",
              )}
            >
              <Activity className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Operación de Máquinas</span>
            </Link>
            <Link
              href="/inventario"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/inventario") && "bg-muted text-primary",
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Inventario</span>
            </Link>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground hidden group-hover:block md:block">
              ADMINISTRACIÓN
            </h2>
            <Link
              href="/empleados"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/empleados") && "bg-muted text-primary",
              )}
            >
              <Users className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Empleados</span>
            </Link>
            <Link
              href="/admin/roles"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/admin/roles") && "bg-muted text-primary",
              )}
            >
              <Cog className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Roles y Permisos</span>
            </Link>
            <Link
              href="/admin/permisos"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/admin/permisos") && "bg-muted text-primary",
              )}
            >
              <span className="hidden group-hover:inline-block md:inline-block pl-7">Permisos</span>
            </Link>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground hidden group-hover:block md:block">
              DOTACIÓN
            </h2>
            <Link
              href="/dotacion"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/dotacion") && "bg-muted text-primary",
              )}
            >
              <Shirt className="h-4 w-4" />
              <span className="hidden group-hover:inline-block md:inline-block">Dotación</span>
            </Link>
            <Link
              href="/dotacion/tipos"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/dotacion/tipos") && "bg-muted text-primary",
              )}
            >
              <span className="hidden group-hover:inline-block md:inline-block pl-7">Tipos de Dotación</span>
            </Link>
            <Link
              href="/dotacion/inventario"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/dotacion/inventario") && "bg-muted text-primary",
              )}
            >
              <span className="hidden group-hover:inline-block md:inline-block pl-7">Inventario</span>
            </Link>
            <Link
              href="/dotacion/entregas"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname?.startsWith("/dotacion/entregas") && "bg-muted text-primary",
              )}
            >
              <span className="hidden group-hover:inline-block md:inline-block pl-7">Entregas</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
