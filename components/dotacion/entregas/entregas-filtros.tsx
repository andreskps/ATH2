"use client"

import { useState, useEffect } from "react"
import { Search, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { getTiposDotacion } from "@/lib/data/dotacion"
import type { TipoDotacion } from "@/lib/types"

interface EntregasFiltrosProps {
  onFilterChange: (filtros: {
    busqueda: string
    tipoDotacion: string
    estado: string
    fechaDesde: Date | undefined
    fechaHasta: Date | undefined
  }) => void
}

export function EntregasFiltros({ onFilterChange }: EntregasFiltrosProps) {
  const [busqueda, setBusqueda] = useState("")
  const [tipoDotacion, setTipoDotacion] = useState("all")
  const [estado, setEstado] = useState("all")
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(undefined)
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(undefined)
  const [tiposDotacion, setTiposDotacion] = useState<TipoDotacion[]>([])

  useEffect(() => {
    const fetchTiposDotacion = async () => {
      const tipos = await getTiposDotacion()
      setTiposDotacion(tipos)
    }
    fetchTiposDotacion()
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        busqueda,
        tipoDotacion,
        estado,
        fechaDesde,
        fechaHasta,
      })
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [busqueda, tipoDotacion, estado, fechaDesde, fechaHasta])

  const handleReset = () => {
    setBusqueda("")
    setTipoDotacion("all")
    setEstado("all")
    setFechaDesde(undefined)
    setFechaHasta(undefined)
  }

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por empleado..."
          className="pl-8"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div>
        <Select value={tipoDotacion} onValueChange={setTipoDotacion}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de dotación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            {tiposDotacion.map((tipo) => (
              <SelectItem key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select value={estado} onValueChange={setEstado}>
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="entregado">Entregado</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fechaDesde ? format(fechaDesde, "dd/MM/yyyy", { locale: es }) : <span>Fecha desde</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={fechaDesde} onSelect={setFechaDesde} initialFocus locale={es} />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fechaHasta ? format(fechaHasta, "dd/MM/yyyy", { locale: es }) : <span>Fecha hasta</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={fechaHasta} onSelect={setFechaHasta} initialFocus locale={es} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-end lg:col-span-5">
        <Button variant="outline" size="sm" onClick={handleReset}>
          Limpiar filtros
        </Button>
      </div>
    </div>
  )
}
