"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function RecepcionesFiltros() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Estados para los filtros
  const [busqueda, setBusqueda] = useState(searchParams.get("busqueda") || "")
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(
    searchParams.get("fechaDesde") ? new Date(searchParams.get("fechaDesde")!) : undefined,
  )
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(
    searchParams.get("fechaHasta") ? new Date(searchParams.get("fechaHasta")!) : undefined,
  )

  // Función para crear la URL con los parámetros de búsqueda
  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, value)
        }
      }

      return newSearchParams.toString()
    },
    [searchParams],
  )

  // Función para aplicar los filtros
  const aplicarFiltros = () => {
    const params: Record<string, string | null> = {
      busqueda: busqueda || null,
      fechaDesde: fechaDesde ? fechaDesde.toISOString() : null,
      fechaHasta: fechaHasta ? fechaHasta.toISOString() : null,
    }

    router.push(`${pathname}?${createQueryString(params)}`)
  }

  // Función para limpiar los filtros
  const limpiarFiltros = () => {
    setBusqueda("")
    setFechaDesde(undefined)
    setFechaHasta(undefined)
    router.push(pathname)
  }

  // Verificar si hay filtros activos
  const hayFiltrosActivos = busqueda || fechaDesde || fechaHasta

  return (
    <div className="bg-muted/40 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Búsqueda */}
        <div className="space-y-2">
          <Label htmlFor="busqueda">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="busqueda"
              placeholder="Orden, proveedor o responsable"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Fecha desde */}
        <div className="space-y-2">
          <Label>Fecha desde</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !fechaDesde && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fechaDesde ? format(fechaDesde, "PPP", { locale: es }) : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={fechaDesde} onSelect={setFechaDesde} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Fecha hasta */}
        <div className="space-y-2">
          <Label>Fecha hasta</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !fechaHasta && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fechaHasta ? format(fechaHasta, "PPP", { locale: es }) : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={fechaHasta} onSelect={setFechaHasta} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Botones de acción */}
        <div className="flex items-end gap-2">
          <Button onClick={aplicarFiltros} className="flex-1">
            Aplicar filtros
          </Button>
          {hayFiltrosActivos && (
            <Button variant="outline" onClick={limpiarFiltros} size="icon">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
