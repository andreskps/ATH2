"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface FiltrosOperacionProps {
  areas: string[]
  areaSeleccionada: string
  setAreaSeleccionada: (area: string) => void
  estadoFiltro: string
  setEstadoFiltro: (estado: string) => void
  operadorFiltro: string
  setOperadorFiltro: (operador: string) => void
}

export function FiltrosOperacion({
  areas,
  areaSeleccionada,
  setAreaSeleccionada,
  estadoFiltro,
  setEstadoFiltro,
  operadorFiltro,
  setOperadorFiltro,
}: FiltrosOperacionProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/3">
        <Label htmlFor="area-filter">Área</Label>
        <Select value={areaSeleccionada} onValueChange={setAreaSeleccionada}>
          <SelectTrigger id="area-filter">
            <SelectValue placeholder="Seleccionar área" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las áreas</SelectItem>
            {areas.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-1/3">
        <Label htmlFor="estado-filter">Estado de operación</Label>
        <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
          <SelectTrigger id="estado-filter">
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="Produciendo">Produciendo</SelectItem>
            <SelectItem value="Detenida">Detenida</SelectItem>
            <SelectItem value="Configurando">Configurando</SelectItem>
            <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
            <SelectItem value="Inactiva">Inactiva</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-1/3">
        <Label htmlFor="operador-filter">Operador</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="operador-filter"
            type="search"
            placeholder="Buscar por operador..."
            className="pl-8"
            value={operadorFiltro}
            onChange={(e) => setOperadorFiltro(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
