"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Search, SlidersHorizontal, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function OrdenesCompraFiltros() {
  const [busqueda, setBusqueda] = useState("")
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [estado, setEstado] = useState("")
  const [proveedor, setProveedor] = useState("")
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(undefined)
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(undefined)
  const [responsable, setResponsable] = useState("")

  const limpiarFiltros = () => {
    setEstado("")
    setProveedor("")
    setFechaDesde(undefined)
    setFechaHasta(undefined)
    setResponsable("")
  }

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por número, proveedor o responsable..."
            className="pl-8"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => setMostrarFiltros(!mostrarFiltros)} className="sm:w-auto w-full">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      {mostrarFiltros && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={estado} onValueChange={setEstado}>
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="creada">Creada</SelectItem>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                    <SelectItem value="recibida-parcial">Recibida Parcial</SelectItem>
                    <SelectItem value="recibida">Recibida</SelectItem>
                    <SelectItem value="cerrada">Cerrada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proveedor">Proveedor</Label>
                <Input
                  id="proveedor"
                  placeholder="Nombre del proveedor"
                  value={proveedor}
                  onChange={(e) => setProveedor(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Fecha desde</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fechaDesde && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fechaDesde ? format(fechaDesde, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={fechaDesde} onSelect={setFechaDesde} initialFocus locale={es} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Fecha hasta</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fechaHasta && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fechaHasta ? format(fechaHasta, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={fechaHasta} onSelect={setFechaHasta} initialFocus locale={es} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsable">Responsable</Label>
                <Input
                  id="responsable"
                  placeholder="Nombre del responsable"
                  value={responsable}
                  onChange={(e) => setResponsable(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={limpiarFiltros} size="sm">
                <X className="mr-2 h-4 w-4" />
                Limpiar
              </Button>
              <Button size="sm">Aplicar Filtros</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
