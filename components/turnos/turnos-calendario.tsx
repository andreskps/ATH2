"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { getTurnosByFecha, getNombreEmpleado } from "@/lib/data/turnos"
import { cn } from "@/lib/utils"

export default function TurnosCalendario() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week")

  // Función para obtener el primer día de la semana (lunes)
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Ajustar cuando el día es domingo
    return new Date(date.setDate(diff))
  }

  // Función para obtener el primer día del mes
  const getStartOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  // Función para obtener el último día del mes
  const getEndOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }

  // Función para generar un array de fechas según el modo de vista
  const getDatesForView = () => {
    const dates: Date[] = []
    let startDate: Date

    if (viewMode === "day") {
      return [new Date(currentDate)]
    } else if (viewMode === "week") {
      startDate = getStartOfWeek(new Date(currentDate))
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)
        dates.push(date)
      }
    } else {
      // month view
      startDate = getStartOfMonth(new Date(currentDate))
      const endDate = getEndOfMonth(new Date(currentDate))

      // Incluir días del mes anterior para completar la primera semana
      const firstDay = startDate.getDay()
      const prevMonthDays = firstDay === 0 ? 6 : firstDay - 1 // Ajustar para que la semana comience en lunes

      for (let i = 0; i < prevMonthDays; i++) {
        const date = new Date(startDate)
        date.setDate(date.getDate() - (prevMonthDays - i))
        dates.push(date)
      }

      // Añadir todos los días del mes actual
      for (let i = 0; i <= endDate.getDate() - startDate.getDate(); i++) {
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)
        dates.push(date)
      }

      // Añadir días del mes siguiente para completar la última semana
      const lastDay = endDate.getDay()
      const nextMonthDays = lastDay === 0 ? 0 : 7 - lastDay

      for (let i = 1; i <= nextMonthDays; i++) {
        const date = new Date(endDate)
        date.setDate(date.getDate() + i)
        dates.push(date)
      }
    }

    return dates
  }

  // Función para navegar al período anterior
  const goToPrevious = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() - 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  // Función para navegar al período siguiente
  const goToNext = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  // Función para formatear la fecha en formato YYYY-MM-DD
  const formatDateToString = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  // Función para obtener el título del calendario según el modo de vista
  const getCalendarTitle = () => {
    const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" }
    if (viewMode === "day") {
      return new Date(currentDate).toLocaleDateString("es-ES", {
        ...options,
        day: "numeric",
      })
    } else if (viewMode === "week") {
      const startOfWeek = getStartOfWeek(new Date(currentDate))
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(endOfWeek.getDate() + 6)

      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} de ${startOfWeek.toLocaleDateString("es-ES", {
          month: "long",
          year: "numeric",
        })}`
      } else if (startOfWeek.getFullYear() === endOfWeek.getFullYear()) {
        return `${startOfWeek.getDate()} de ${startOfWeek.toLocaleDateString("es-ES", {
          month: "long",
        })} - ${endOfWeek.getDate()} de ${endOfWeek.toLocaleDateString("es-ES", {
          month: "long",
          year: "numeric",
        })}`
      } else {
        return `${startOfWeek.getDate()} de ${startOfWeek.toLocaleDateString("es-ES", {
          month: "long",
          year: "numeric",
        })} - ${endOfWeek.getDate()} de ${endOfWeek.toLocaleDateString("es-ES", {
          month: "long",
          year: "numeric",
        })}`
      }
    } else {
      return new Date(currentDate).toLocaleDateString("es-ES", options)
    }
  }

  // Función para obtener el color del badge según el estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Confirmado":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "En Progreso":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Completado":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Cancelado":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Obtener las fechas para la vista actual
  const dates = getDatesForView()

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant={viewMode === "day" ? "default" : "outline"} size="sm" onClick={() => setViewMode("day")}>
                Día
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
              >
                Semana
              </Button>
              <Button
                variant={viewMode === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("month")}
              >
                Mes
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" onClick={goToPrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-medium">{getCalendarTitle()}</h3>
              <Button variant="outline" size="icon" onClick={goToNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={() => router.push("/turnos/crear")} className="gap-1">
              <Plus className="h-4 w-4" />
              Crear Turno
            </Button>
          </div>

          {viewMode === "day" ? (
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">
                {currentDate.toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h3>
              <DayView date={currentDate} />
            </div>
          ) : viewMode === "week" ? (
            <div className="grid grid-cols-7 gap-4">
              {dates.map((date, index) => (
                <div key={index} className="border rounded-lg p-2 min-h-[150px]">
                  <div className="text-center mb-2">
                    <div className="text-sm text-muted-foreground">
                      {date.toLocaleDateString("es-ES", { weekday: "short" })}
                    </div>
                    <div
                      className={cn(
                        "inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium",
                        isToday(date) ? "bg-primary text-primary-foreground" : "",
                      )}
                    >
                      {date.getDate()}
                    </div>
                  </div>
                  <DayView date={date} compact />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
                <div key={day} className="text-center font-medium text-sm py-2">
                  {day}
                </div>
              ))}
              {dates.map((date, index) => {
                const isCurrentMonth = date.getMonth() === currentDate.getMonth()
                return (
                  <div
                    key={index}
                    className={cn("border rounded-lg p-1 min-h-[100px] relative", !isCurrentMonth && "bg-muted/20")}
                  >
                    <div
                      className={cn(
                        "absolute top-1 right-1 flex items-center justify-center h-6 w-6 rounded-full text-xs",
                        isToday(date) ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                      )}
                    >
                      {date.getDate()}
                    </div>
                    <div className="mt-6 text-xs">
                      <DayView date={date} veryCompact />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Función para verificar si una fecha es hoy
function isToday(date: Date) {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

// Componente para mostrar los turnos de un día específico
function DayView({
  date,
  compact = false,
  veryCompact = false,
}: { date: Date; compact?: boolean; veryCompact?: boolean }) {
  const router = useRouter()
  const dateString = date.toISOString().split("T")[0]
  const turnos = getTurnosByFecha(dateString)

  if (turnos.length === 0) {
    if (veryCompact) return null
    return <div className="text-center text-muted-foreground text-sm py-2">No hay turnos</div>
  }

  return (
    <div className="space-y-2">
      {turnos.map((turno) => (
        <div
          key={turno.id}
          className={cn("border rounded p-2 cursor-pointer hover:bg-muted/50 transition-colors", compact && "p-1")}
          onClick={() => router.push(`/turnos/${turno.id}`)}
        >
          {!veryCompact && (
            <div className="flex justify-between items-center mb-1">
              <span className={cn("text-sm font-medium", compact && "text-xs")}>Turno {turno.categoria}</span>
              <Badge className={cn("text-xs", getEstadoColor(turno.estado))} variant="outline">
                {turno.estado}
              </Badge>
            </div>
          )}
          <div className={cn("text-sm", compact && "text-xs", veryCompact && "text-[10px]")}>
            {veryCompact ? (
              <Badge variant="outline" className="w-full justify-center text-[10px]">
                T{turno.categoria}: {turno.area}
              </Badge>
            ) : (
              <>
                <div>{turno.area}</div>
                <div className="text-muted-foreground">{getNombreEmpleado(turno.supervisor)}</div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// Función para obtener el color del badge según el estado
function getEstadoColor(estado: string) {
  switch (estado) {
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "Confirmado":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "En Progreso":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100"
    case "Completado":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Cancelado":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}
