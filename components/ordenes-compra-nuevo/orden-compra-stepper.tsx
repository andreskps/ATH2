"use client"

import { CheckCircle, Clock, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import type { EstadoOrdenCompra } from "@/lib/data/ordenes-compra-nuevo"

interface OrdenCompraStepperProps {
  estadoActual: EstadoOrdenCompra
}

const pasos = [
  {
    id: "creada",
    titulo: "Creada",
    descripcion: "Orden creada",
    icon: Clock,
  },
  {
    id: "confirmada",
    titulo: "Confirmada",
    descripcion: "Orden confirmada",
    icon: CheckCircle,
  },
  {
    id: "recibida-parcial",
    titulo: "Recibida Parcial",
    descripcion: "Recepción parcial",
    icon: Package,
  },
  {
    id: "recibida",
    titulo: "Recibida",
    descripcion: "Completamente recibida",
    icon: CheckCircle,
  },
  {
    id: "cerrada",
    titulo: "Cerrada",
    descripcion: "Orden cerrada",
    icon: CheckCircle,
  },
]

export function OrdenCompraStepper({ estadoActual }: OrdenCompraStepperProps) {
  const getEstadoPaso = (pasoId: string) => {
    const indicePasoActual = pasos.findIndex((p) => p.id === estadoActual)
    const indicePaso = pasos.findIndex((p) => p.id === pasoId)

    if (indicePaso < indicePasoActual) return "completado"
    if (indicePaso === indicePasoActual) return "actual"
    return "pendiente"
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {pasos.map((paso, index) => {
          const estado = getEstadoPaso(paso.id)
          const Icon = paso.icon

          return (
            <div key={paso.id} className="flex items-center">
              {/* Paso */}
              <div className="flex flex-col items-center">
                <div
                  className={cn("flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors", {
                    "bg-green-500 border-green-500 text-white": estado === "completado",
                    "bg-blue-500 border-blue-500 text-white": estado === "actual",
                    "bg-gray-100 border-gray-300 text-gray-400": estado === "pendiente",
                  })}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn("text-sm font-medium", {
                      "text-green-600": estado === "completado",
                      "text-blue-600": estado === "actual",
                      "text-gray-400": estado === "pendiente",
                    })}
                  >
                    {paso.titulo}
                  </p>
                  <p className="text-xs text-muted-foreground">{paso.descripcion}</p>
                </div>
              </div>

              {/* Línea conectora */}
              {index < pasos.length - 1 && (
                <div
                  className={cn("flex-1 h-0.5 mx-4 transition-colors", {
                    "bg-green-500": getEstadoPaso(pasos[index + 1].id) === "completado",
                    "bg-gray-300": getEstadoPaso(pasos[index + 1].id) !== "completado",
                  })}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
