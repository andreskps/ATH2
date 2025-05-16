"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import { getProgramaciones } from "@/lib/data/programacion"
import { maquinaria } from "@/lib/data/maquinaria"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

export default function ProgramacionCalendario() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedMaquina, setSelectedMaquina] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"week" | "month">("week")

  const programaciones = getProgramaciones()

  // Filtrar programaciones por máquina
  const filteredProgramaciones =
    selectedMaquina === "all"
      ? programaciones
      : programaciones.filter((prog) => prog.maquinaId.toString() === selectedMaquina)

  // Obtener el primer día de la semana actual
  const getFirstDayOfWeek = (date: Date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Ajustar cuando el día es domingo
    return new Date(date.setDate(diff))
  }

  // Obtener el primer día del mes actual
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  // Obtener días para la vista actual
  const getDaysForView = () => {
    const days = []
    let firstDay
    let totalDays

    if (viewMode === "week") {
      firstDay = getFirstDayOfWeek(new Date(currentDate))
      totalDays = 7
    } else {
      firstDay = getFirstDayOfMonth(new Date(currentDate))
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
      totalDays = lastDay.getDate()
    }

    for (let i = 0; i < totalDays; i++) {
      const day = new Date(firstDay)
      day.setDate(firstDay.getDate() + i)
      days.push(day)
    }

    return days
  }

  // Navegar a la semana/mes anterior
  const prevPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  // Navegar a la semana/mes siguiente
  const nextPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  // Verificar si una programación está en un día específico
  const isProgramacionInDay = (programacion: any, day: Date) => {
    const startDate = new Date(programacion.fechaInicio)
    const endDate = new Date(programacion.fechaFin)

    // Normalizar las fechas para comparar solo día, mes y año
    const normalizedDay = new Date(day.getFullYear(), day.getMonth(), day.getDate())
    const normalizedStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    const normalizedEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())

    return normalizedDay >= normalizedStart && normalizedDay <= normalizedEnd
  }

  // Obtener programaciones para un día específico
  const getProgramacionesForDay = (day: Date) => {
    return filteredProgramaciones.filter((prog) => isProgramacionInDay(prog, day))
  }

  // Formatear el título del período actual
  const getPeriodTitle = () => {
    if (viewMode === "week") {
      const firstDay = getFirstDayOfWeek(new Date(currentDate))
      const lastDay = new Date(firstDay)
      lastDay.setDate(firstDay.getDate() + 6)

      return `${formatDate(firstDay.toISOString())} - ${formatDate(lastDay.toISOString())}`
    } else {
      return new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" }).format(currentDate)
    }
  }

  const days = getDaysForView()

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevPeriod}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold min-w-[200px] text-center">{getPeriodTitle()}</h2>
          <Button variant="outline" size="icon" onClick={nextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Select value={selectedMaquina} onValueChange={setSelectedMaquina}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todas las máquinas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las máquinas</SelectItem>
              {maquinaria.map((maquina) => (
                <SelectItem key={maquina.id} value={maquina.id.toString()}>
                  {maquina.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 border rounded-md p-1">
            <Button variant={viewMode === "week" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("week")}>
              Semana
            </Button>
            <Button variant={viewMode === "month" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("month")}>
              Mes
            </Button>
          </div>
        </div>
      </div>

      <div className={`grid ${viewMode === "week" ? "grid-cols-7" : "grid-cols-7"} gap-2`}>
        {/* Encabezados de días */}
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, index) => (
          <div key={index} className="text-center font-medium p-2 bg-muted rounded-md">
            {day}
          </div>
        ))}

        {/* Días del mes anterior para completar la primera semana (solo en vista mensual) */}
        {viewMode === "month" &&
          (() => {
            const firstDay = getFirstDayOfMonth(new Date(currentDate))
            const dayOfWeek = firstDay.getDay() || 7 // Convertir 0 (domingo) a 7
            const emptyDays = dayOfWeek - 1

            return Array.from({ length: emptyDays }).map((_, index) => (
              <div key={`empty-start-${index}`} className="min-h-[100px] bg-gray-50 rounded-md opacity-50"></div>
            ))
          })()}

        {/* Días del período actual */}
        {days.map((day, index) => {
          const programacionesDay = getProgramacionesForDay(day)
          const isToday = new Date().toDateString() === day.toDateString()

          return (
            <Card key={index} className={`min-h-[100px] ${isToday ? "border-primary" : ""}`}>
              <CardHeader className="p-2">
                <CardTitle className={`text-sm ${isToday ? "text-primary font-bold" : ""}`}>{day.getDate()}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 space-y-1">
                {programacionesDay.length > 0 ? (
                  programacionesDay.map((prog) => {
                    const maquina = maquinaria.find((m) => m.id === prog.maquinaId)

                    return (
                      <TooltipProvider key={prog.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/programacion/${prog.id}`}>
                              <div
                                className={`text-xs p-1 rounded truncate cursor-pointer ${
                                  prog.estado === "enProduccion"
                                    ? "bg-blue-100 text-blue-800"
                                    : prog.estado === "completada"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {maquina?.nombre}
                              </div>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              <p className="font-medium">Orden: {prog.ordenId}</p>
                              <p>Máquina: {maquina?.nombre}</p>
                              <p>Turno: {prog.turno}</p>
                              <Badge
                                variant="outline"
                                className={
                                  prog.estado === "enProduccion"
                                    ? "bg-blue-100 text-blue-800"
                                    : prog.estado === "completada"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                }
                              >
                                {prog.estado}
                              </Badge>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )
                  })
                ) : (
                  <div className="text-xs text-muted-foreground">Sin programaciones</div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {/* Días del mes siguiente para completar la última semana (solo en vista mensual) */}
        {viewMode === "month" &&
          (() => {
            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
            const dayOfWeek = lastDay.getDay() || 7 // Convertir 0 (domingo) a 7
            const emptyDays = 7 - dayOfWeek

            return Array.from({ length: emptyDays }).map((_, index) => (
              <div key={`empty-end-${index}`} className="min-h-[100px] bg-gray-50 rounded-md opacity-50"></div>
            ))
          })()}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Info className="h-4 w-4" />
        <p>Haga clic en una programación para ver más detalles.</p>
      </div>
    </div>
  )
}
