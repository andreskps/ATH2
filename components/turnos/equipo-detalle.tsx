import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit } from "lucide-react"
import Link from "next/link"
import type { Equipo } from "@/lib/data/turnos"
import { getNombreEmpleado } from "@/lib/data/turnos"

interface EquipoDetalleProps {
  equipo: Equipo
}

export default function EquipoDetalle({ equipo }: EquipoDetalleProps) {
  const supervisorNombre = getNombreEmpleado(equipo.supervisor)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Información del Equipo</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href={`/turnos/equipos/editar/${equipo.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Editar Equipo
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Nombre del Equipo</h3>
                <p className="text-lg font-semibold">{equipo.nombre}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Área</h3>
                <Badge variant="outline" className="mt-1">
                  {equipo.area}
                </Badge>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Supervisor</h3>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40&query=avatar`} alt={supervisorNombre} />
                  <AvatarFallback>
                    {supervisorNombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{supervisorNombre}</p>
                  <p className="text-sm text-muted-foreground">Supervisor</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Operarios Asignados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipo.operarios.length > 0 ? (
                equipo.operarios.map((operarioId) => {
                  const nombreOperario = getNombreEmpleado(operarioId)
                  return (
                    <div key={operarioId} className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&query=avatar`} alt={nombreOperario} />
                        <AvatarFallback>
                          {nombreOperario
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{nombreOperario}</p>
                        <p className="text-sm text-muted-foreground">Operario</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-muted-foreground">No hay operarios asignados a este equipo.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Turnos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Aquí podríamos mostrar los turnos recientes del equipo */}
              <p className="text-muted-foreground">No hay turnos recientes para este equipo.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
