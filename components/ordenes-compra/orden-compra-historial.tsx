import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CheckCircle, Circle, Clock, Package } from "lucide-react"

interface HistorialCambio {
  id: string
  estadoAnterior: string | null
  estadoNuevo: string
  fecha: string
  usuarioNombre: string
  comentarios?: string
}

interface OrdenCompraHistorialProps {
  historial: HistorialCambio[]
}

export function OrdenCompraHistorial({ historial }: OrdenCompraHistorialProps) {
  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "creada":
        return <Circle className="h-4 w-4" />
      case "confirmada":
        return <CheckCircle className="h-4 w-4" />
      case "recibida-parcial":
        return <Package className="h-4 w-4" />
      case "recibida":
        return <CheckCircle className="h-4 w-4" />
      case "cerrada":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "creada":
        return "bg-blue-100 text-blue-800"
      case "confirmada":
        return "bg-purple-100 text-purple-800"
      case "recibida-parcial":
        return "bg-amber-100 text-amber-800"
      case "recibida":
        return "bg-green-100 text-green-800"
      case "cerrada":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case "creada":
        return "Creada"
      case "confirmada":
        return "Confirmada"
      case "recibida-parcial":
        return "Recibida Parcial"
      case "recibida":
        return "Recibida"
      case "cerrada":
        return "Cerrada"
      default:
        return estado
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Cambios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {historial.map((cambio, index) => (
            <div key={cambio.id} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
              <div className="flex-shrink-0 mt-1">
                <div className={`p-2 rounded-full ${getEstadoColor(cambio.estadoNuevo)}`}>
                  {getEstadoIcon(cambio.estadoNuevo)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getEstadoColor(cambio.estadoNuevo)} variant="outline">
                      {getEstadoTexto(cambio.estadoNuevo)}
                    </Badge>
                    {cambio.estadoAnterior && (
                      <span className="text-sm text-muted-foreground">
                        desde {getEstadoTexto(cambio.estadoAnterior)}
                      </span>
                    )}
                  </div>
                  <time className="text-sm text-muted-foreground">
                    {format(new Date(cambio.fecha), "dd/MM/yyyy HH:mm", { locale: es })}
                  </time>
                </div>

                <p className="text-sm text-muted-foreground mt-1">Por {cambio.usuarioNombre}</p>

                {cambio.comentarios && (
                  <p className="text-sm mt-2 p-2 bg-muted rounded text-muted-foreground">{cambio.comentarios}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
