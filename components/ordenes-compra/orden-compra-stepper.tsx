"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Circle, Package } from "lucide-react"
import { cn } from "@/lib/utils"

interface OrdenCompraStepperProps {
  estado: string
}

export function OrdenCompraStepper({ estado }: OrdenCompraStepperProps) {
  const steps = [
    {
      key: "creada",
      label: "Creada",
      icon: Circle,
      description: "Orden creada y en edición",
    },
    {
      key: "confirmada",
      label: "Confirmada",
      icon: CheckCircle,
      description: "Orden confirmada y enviada al proveedor",
    },
    {
      key: "recibida-parcial",
      label: "Recibida Parcial",
      icon: Package,
      description: "Algunos productos han sido recibidos",
    },
    {
      key: "recibida",
      label: "Recibida",
      icon: CheckCircle,
      description: "Todos los productos han sido recibidos",
    },
    {
      key: "cerrada",
      label: "Cerrada",
      icon: CheckCircle,
      description: "Orden completada y cerrada",
    },
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.key === estado)
  }

  const currentStepIndex = getCurrentStepIndex()

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStepIndex) return "completed"
    if (stepIndex === currentStepIndex) return "current"
    return "pending"
  }

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100"
      case "current":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-400 bg-gray-100"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(index)
            const Icon = step.icon
            const isLast = index === steps.length - 1

            return (
              <div key={step.key} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                      getStepColor(status),
                      status === "current" && "border-blue-600",
                      status === "completed" && "border-green-600",
                      status === "pending" && "border-gray-300",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        status === "current" && "text-blue-600",
                        status === "completed" && "text-green-600",
                        status === "pending" && "text-gray-400",
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[120px]">{step.description}</p>
                  </div>
                </div>

                {!isLast && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-4 transition-colors",
                      index < currentStepIndex ? "bg-green-600" : "bg-gray-300",
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
