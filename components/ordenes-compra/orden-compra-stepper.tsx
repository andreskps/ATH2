"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Clock, Package, Truck, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { EstadoOrdenCompra } from "@/lib/data/ordenes-compra"

interface OrdenCompraStepperProps {
  estadoActual: EstadoOrdenCompra
  className?: string
}

const pasos = [
  {
    id: "creada",
    titulo: "Creada",
    descripcion: "Orden registrada",
    icono: Clock,
  },
  {
    id: "confirmada",
    titulo: "Confirmada",
    descripcion: "Enviada al proveedor",
    icono: Check,
  },
  {
    id: "recibida-parcial",
    titulo: "Recibida Parcial",
    descripcion: "Recepción parcial",
    icono: Package,
  },
  {
    id: "recibida",
    titulo: "Recibida",
    descripcion: "Recepción completa",
    icono: Truck,
  },
  {
    id: "cerrada",
    titulo: "Cerrada",
    descripcion: "Proceso finalizado",
    icono: X,
  },
]

export function OrdenCompraStepper({ estadoActual, className }: OrdenCompraStepperProps) {
  const getEstadoIndex = (estado: EstadoOrdenCompra) => {
    return pasos.findIndex((paso) => paso.id === estado)
  }

  const estadoIndex = getEstadoIndex(estadoActual)

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < estadoIndex) return "completed"
    if (stepIndex === estadoIndex) return "current"
    return "upcoming"
  }

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white"
      case "current":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-200 text-gray-500"
    }
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {pasos.map((paso, index) => {
            const status = getStepStatus(index)
            const Icon = paso.icono
            const isLast = index === pasos.length - 1

            return (
              <div key={paso.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                      getStepColor(status),
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">{paso.titulo}</p>
                    <p className="text-xs text-muted-foreground">{paso.descripcion}</p>
                  </div>
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "mx-4 h-0.5 w-16 transition-colors",
                      status === "completed" ? "bg-green-500" : "bg-gray-200",
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex justify-center">
          <Badge variant={estadoActual === "cerrada" ? "destructive" : "default"} className="text-sm">
            Estado actual: {pasos.find((p) => p.id === estadoActual)?.titulo}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
