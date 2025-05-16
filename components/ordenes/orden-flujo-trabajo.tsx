"use client"
import { CheckCircle2, Circle, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { estadosOrden } from "@/lib/data/ordenes"
import type { Orden } from "@/lib/data/ordenes"

interface OrdenFlujoTrabajoProps {
  orden: Orden
}

export function OrdenFlujoTrabajo({ orden }: OrdenFlujoTrabajoProps) {
  // Definir el flujo de trabajo principal
  const flujoTrabajo = [
    "ordenAbierta",
    "pendientePago",
    "liberadaProduccion",
    "enProduccion",
    "productoTerminado",
    "cierreTecnico",
    "facturadoEntregado",
  ]

  // Estados excepcionales
  const estadosExcepcionales = ["molido", "devolucion", "cancelada"]

  // Verificar si un estado está en el historial
  const estaEnHistorial = (estado: string) => {
    return orden.historialEstados.some((h) => h.estadoNuevo === estado)
  }

  // Verificar si un estado es el actual
  const esEstadoActual = (estado: string) => {
    return orden.estado === estado
  }

  // Obtener la fecha de un estado del historial
  const getFechaEstado = (estado: string) => {
    const cambio = orden.historialEstados.find((h) => h.estadoNuevo === estado)
    return cambio ? new Date(cambio.fecha).toLocaleString() : ""
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Flujo de trabajo</h3>

        <div className="overflow-x-auto">
          <div className="flex items-center space-x-1 min-w-max">
            {flujoTrabajo.map((estado, index) => {
              const estadoInfo = estadosOrden[estado as keyof typeof estadosOrden]
              const completado = estaEnHistorial(estado)
              const actual = esEstadoActual(estado)
              const fecha = getFechaEstado(estado)

              return (
                <div key={estado} className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`flex flex-col items-center ${
                            actual ? "scale-110 z-10" : completado ? "" : "opacity-50"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              actual
                                ? estadoInfo.color
                                : completado
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {completado || actual ? (
                              <CheckCircle2 className="h-6 w-6" />
                            ) : (
                              <Circle className="h-6 w-6" />
                            )}
                          </div>
                          <span className="text-xs mt-1 font-medium whitespace-nowrap">{estadoInfo.label}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm">
                          <p className="font-semibold">{estadoInfo.label}</p>
                          <p>{estadoInfo.description}</p>
                          {fecha && <p className="text-xs mt-1">Fecha: {fecha}</p>}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {index < flujoTrabajo.length - 1 && (
                    <ArrowRight className={`h-4 w-4 mx-1 ${completado ? "text-green-500" : "text-gray-300"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Estados excepcionales */}
        {estadosExcepcionales.includes(orden.estado) && (
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Estado actual excepcional:</h4>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  estadosOrden[orden.estado as keyof typeof estadosOrden].color
                }`}
              >
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <p className="font-medium">{estadosOrden[orden.estado as keyof typeof estadosOrden].label}</p>
                <p className="text-sm text-gray-500">
                  {estadosOrden[orden.estado as keyof typeof estadosOrden].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
