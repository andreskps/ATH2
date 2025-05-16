"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { ClockIcon, UserIcon } from "lucide-react"

// Podríamos extender la interfaz de la orden compra en el archivo de tipos,
// pero por simplicidad lo definimos aquí
interface HistorialCambio {
  id: string
  fecha: string
  estadoAnterior: string
  estadoNuevo: string
  usuarioNombre: string
  comentario?: string
}

interface OrdenCompraHistorialProps {
  historial: HistorialCambio[]
}

export function OrdenCompraHistorial({ historial }: OrdenCompraHistorialProps) {
  // Función para formatear el estado para mostrar
  const formatearEstado = (estado: string) => {
    switch (estado) {
      case "creado":
        return "Creado"
      case "recibido-parcial":
        return "Recibido Parcial"
      case "recibido":
        return "Recibido"
      case "cerrado":
        return "Cerrado"
      default:
        return estado
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Historial de Cambios</CardTitle>
      </CardHeader>
      <CardContent>
        {historial.length === 0 ? (
          <p className="text-muted-foreground">No hay cambios registrados.</p>
        ) : (
          <div className="relative">
            {/* Línea del tiempo */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-muted-foreground/30 ml-6" />

            <ul className="space-y-4">
              {historial.map((cambio) => (
                <li key={cambio.id} className="relative pl-14">
                  {/* Círculo de punto de tiempo */}
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary ring-4 ring-background ml-5 mt-1.5" />

                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{formatDate(cambio.fecha)}</span>
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{cambio.usuarioNombre}</span>
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className="font-medium">
                        Cambio de estado: {formatearEstado(cambio.estadoAnterior)} →{" "}
                        {formatearEstado(cambio.estadoNuevo)}
                      </span>
                    </div>

                    {cambio.comentario && (
                      <div className="text-sm mt-2 text-muted-foreground border-t pt-2 border-muted-foreground/20">
                        {cambio.comentario}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
