import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, User, Users } from "lucide-react"
import { type Turno, getNombreEmpleado, getEquipoById } from "@/lib/data/turnos"

interface TurnoDetalleProps {
  turno: Turno
}

export default function TurnoDetalle({ turno }: TurnoDetalleProps) {
  const equipo = turno.equipoId ? getEquipoById(turno.equipoId) : null

  // Función para formatear la fecha
  const formatFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Función para obtener el color del badge según el estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Confirmado":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "En Progreso":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Completado":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Cancelado":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Turno {turno.categoria}</CardTitle>
            <CardDescription>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                {formatFecha(turno.fecha)}
              </div>
            </CardDescription>
          </div>
          <Badge className={getEstadoColor(turno.estado)}>{turno.estado}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Información General</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Área:</span>
              <span className="ml-2">{turno.area}</span>
            </div>
            {equipo && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium">Equipo:</span>
                <span className="ml-2">{equipo.nombre}</span>
              </div>
            )}
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Categoría:</span>
              <span className="ml-2">Turno {turno.categoria}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Personal Asignado</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Supervisor</h4>
              <div className="flex items-center p-3 border rounded-md">
                <User className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <p className="font-medium">{getNombreEmpleado(turno.supervisor)}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Operarios</h4>
              <div className="space-y-2">
                {turno.operarios.map((operarioId) => (
                  <div key={operarioId} className="flex items-center p-3 border rounded-md">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="font-medium">{getNombreEmpleado(operarioId)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
