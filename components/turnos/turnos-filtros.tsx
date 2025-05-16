"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Filter, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { getEmpleados } from "@/lib/data/empleados"

export default function TurnosFiltros() {
  const [categoria, setCategoria] = useState<string>("")
  const [area, setArea] = useState<string>("")
  const [supervisor, setSupervisor] = useState<string>("")
  const [estado, setEstado] = useState<string>("")
  const [fechaInicio, setFechaInicio] = useState<Date | undefined>()
  const [fechaFin, setFechaFin] = useState<Date | undefined>()
  const [filtersVisible, setFiltersVisible] = useState(false)

  const empleados = getEmpleados()
  const supervisores = empleados.filter(
    (emp) => emp.cargo?.toLowerCase().includes("supervisor") || emp.cargo?.toLowerCase().includes("jefe"),
  )

  const limpiarFiltros = () => {
    setCategoria("")
    setArea("")
    setSupervisor("")
    setEstado("")
    setFechaInicio(undefined)
    setFechaFin(undefined)
  }

  const aplicarFiltros = () => {
    // Aquí iría la lógica para aplicar los filtros
    console.log({
      categoria,
      area,
      supervisor,
      estado,
      fechaInicio: fechaInicio ? format(fechaInicio, "yyyy-MM-dd") : undefined,
      fechaFin: fechaFin ? format(fechaFin, "yyyy-MM-dd") : undefined,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <Button variant="outline" size="sm" onClick={() => setFiltersVisible(!filtersVisible)}>
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        {(categoria || area || supervisor || estado || fechaInicio || fechaFin) && (
          <Button variant="ghost" size="sm" onClick={limpiarFiltros}>
            <X className="mr-2 h-4 w-4" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {filtersVisible && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Categoría</label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Área</label>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Inyección">Inyección</SelectItem>
                <SelectItem value="PET">PET</SelectItem>
                <SelectItem value="Soplado">Soplado</SelectItem>
                <SelectItem value="Ensamblaje">Ensamblaje</SelectItem>
                <SelectItem value="Empaque">Empaque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Supervisor</label>
            <Select value={supervisor} onValueChange={setSupervisor}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {supervisores.map((sup) => (
                  <SelectItem key={sup.id} value={sup.id.toString()}>
                    {sup.nombre} {sup.apellidos}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Estado</label>
            <Select value={estado} onValueChange={setEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Confirmado">Confirmado</SelectItem>
                <SelectItem value="En Progreso">En Progreso</SelectItem>
                <SelectItem value="Completado">Completado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Fecha Inicio</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !fechaInicio && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fechaInicio ? format(fechaInicio, "dd/MM/yyyy", { locale: es }) : <span>Seleccionar</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={fechaInicio} onSelect={setFechaInicio} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Fecha Fin</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !fechaFin && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fechaFin ? format(fechaFin, "dd/MM/yyyy", { locale: es }) : <span>Seleccionar</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={fechaFin} onSelect={setFechaFin} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="md:col-span-3 lg:col-span-6 flex justify-end">
            <Button onClick={aplicarFiltros}>Aplicar Filtros</Button>
          </div>
        </div>
      )}
    </div>
  )
}
