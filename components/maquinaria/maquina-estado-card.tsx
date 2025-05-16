"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Activity, Calendar, FileText } from "lucide-react"
import type { MaquinaOperacion } from "@/hooks/use-maquinaria-operacion"

interface MaquinaEstadoCardProps {
  maquina: MaquinaOperacion
}

export function MaquinaEstadoCard({ maquina }: MaquinaEstadoCardProps) {
  const router = useRouter()
  const [showDetails, setShowDetails] = useState(false)

  // Determinar color del estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Produciendo":
        return "bg-green-100 text-green-800"
      case "Detenida":
        return "bg-red-100 text-red-800"
      case "Configurando":
        return "bg-blue-100 text-blue-800"
      case "Mantenimiento":
        return "bg-yellow-100 text-yellow-800"
      case "Inactiva":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Calcular eficiencia
  const eficiencia = maquina.eficiencia || 0
  const getEficienciaColor = (valor: number) => {
    if (valor >= 85) return "text-green-600"
    if (valor >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{maquina.nombre}</CardTitle>
            <Badge className={getEstadoColor(maquina.estadoOperacion)}>{maquina.estadoOperacion}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {maquina.codigo} - {maquina.modelo}
          </p>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            {maquina.operador && (
              <div
                className={`flex items-center gap-2 ${maquina.estadoOperacion === "Produciendo" ? "bg-green-50 p-2 rounded-md border border-green-100" : ""}`}
              >
                <Avatar className={`${maquina.estadoOperacion === "Produciendo" ? "h-10 w-10" : "h-6 w-6"}`}>
                  <AvatarImage src={maquina.operador.avatar || ""} alt={maquina.operador.nombre} />
                  <AvatarFallback>{maquina.operador.nombre.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <span className={`${maquina.estadoOperacion === "Produciendo" ? "font-medium" : "text-sm"}`}>
                    {maquina.operador.nombre}
                  </span>
                  {maquina.estadoOperacion === "Produciendo" && (
                    <p className="text-xs text-green-700">Operando actualmente</p>
                  )}
                </div>
              </div>
            )}

            {maquina.estadoOperacion === "Produciendo" && maquina.operador && (
              <div className="mt-2">
                <div className="rounded-md overflow-hidden border border-green-100">
                  <img
                    src={
                      maquina.operador.fotoOperando ||
                      `/placeholder.svg?height=150&width=300&query=Operario trabajando en máquina industrial`
                    }
                    alt={`${maquina.operador.nombre} operando ${maquina.nombre}`}
                    className="w-full h-32 object-cover"
                  />
                </div>
                <p className="text-xs text-center mt-1 text-muted-foreground">Operario en actividad</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{maquina.horaInicio ? `Desde: ${maquina.horaInicio}` : "No iniciada"}</span>
            </div>

            {maquina.productoActual && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Producto: {maquina.productoActual}</span>
              </div>
            )}

            {maquina.ordenActual && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Orden: {maquina.ordenActual}</span>
              </div>
            )}

            {maquina.eficiencia !== undefined && (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Eficiencia</span>
                  <span className={`text-sm font-medium ${getEficienciaColor(eficiencia)}`}>{eficiencia}%</span>
                </div>
                <Progress value={eficiencia} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex justify-between w-full">
            <Button variant="outline" size="sm" onClick={() => router.push(`/maquinaria/${maquina.id}`)}>
              Ver máquina
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setShowDetails(true)}>
              Detalles
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{maquina.nombre}</DialogTitle>
            <DialogDescription>Detalles de operación actual</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Estado:</span>
              <Badge className={getEstadoColor(maquina.estadoOperacion)}>{maquina.estadoOperacion}</Badge>
            </div>

            {maquina.operador && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Operador:</span>
                <div className="flex items-center gap-2">
                  <Avatar className={`${maquina.estadoOperacion === "Produciendo" ? "h-8 w-8" : "h-6 w-6"}`}>
                    <AvatarImage src={maquina.operador.avatar || ""} alt={maquina.operador.nombre} />
                    <AvatarFallback>{maquina.operador.nombre.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className={maquina.estadoOperacion === "Produciendo" ? "font-medium" : ""}>
                      {maquina.operador.nombre}
                    </span>
                    {maquina.estadoOperacion === "Produciendo" && (
                      <p className="text-xs text-green-700">Operando actualmente</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {maquina.estadoOperacion === "Produciendo" && maquina.operador && (
              <div className="mt-2">
                <span className="font-medium">Operario en actividad:</span>
                <div className="mt-2 rounded-md overflow-hidden border">
                  <img
                    src={
                      maquina.operador.fotoOperando ||
                      `/placeholder.svg?height=300&width=500&query=Operario trabajando en máquina industrial ${maquina.tipo}`
                    }
                    alt={`${maquina.operador.nombre} operando ${maquina.nombre}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="font-medium">Ubicación:</span>
              <span>{maquina.ubicacion}</span>
            </div>

            {maquina.horaInicio && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Hora de inicio:</span>
                <span>{maquina.horaInicio}</span>
              </div>
            )}

            {maquina.tiempoOperacion && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Tiempo de operación:</span>
                <span>{maquina.tiempoOperacion}</span>
              </div>
            )}

            {maquina.productoActual && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Producto:</span>
                <span>{maquina.productoActual}</span>
              </div>
            )}

            {maquina.ordenActual && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Orden:</span>
                <span>{maquina.ordenActual}</span>
              </div>
            )}

            {maquina.moldeActual && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Molde:</span>
                <span>{maquina.moldeActual}</span>
              </div>
            )}

            {maquina.ciclosPorMinuto !== undefined && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Ciclos por minuto:</span>
                <span>{maquina.ciclosPorMinuto}</span>
              </div>
            )}

            {maquina.unidadesProducidas !== undefined && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Unidades producidas:</span>
                <span>{maquina.unidadesProducidas}</span>
              </div>
            )}

            {maquina.metaProduccion !== undefined && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Meta de producción:</span>
                <span>{maquina.metaProduccion}</span>
              </div>
            )}

            {maquina.eficiencia !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Eficiencia:</span>
                  <span className={getEficienciaColor(eficiencia)}>{eficiencia}%</span>
                </div>
                <Progress value={eficiencia} className="h-2" />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            {maquina.estadoOperacion === "Detenida" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Activity className="h-4 w-4 mr-2" />
                      Reanudar
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reanudar operación de la máquina</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {maquina.estadoOperacion === "Produciendo" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Activity className="h-4 w-4 mr-2" />
                      Detener
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Detener operación de la máquina</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Button onClick={() => router.push(`/supervision/maquina/${maquina.id}`)}>Ver supervisión</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
