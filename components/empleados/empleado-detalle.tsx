import { AtSign, Briefcase, Calendar, Clock, FileText, Home, Phone, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Empleado } from "@/lib/types"

interface EmpleadoDetalleProps {
  empleado: Empleado
}

export default function EmpleadoDetalle({ empleado }: EmpleadoDetalleProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>Datos personales del empleado.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={empleado.foto || "/placeholder.svg"} alt={empleado.nombre} />
              <AvatarFallback>
                {empleado.nombre.charAt(0)}
                {empleado.apellidos.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-xl font-bold">
                {empleado.nombre} {empleado.apellidos}
              </h3>
              <p className="text-muted-foreground">{empleado.cargo}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Cédula</p>
                <p className="text-muted-foreground">{empleado.cedula}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Fecha de Nacimiento</p>
                <p className="text-muted-foreground">
                  {new Date(empleado.fechaNacimiento).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Home className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Dirección</p>
                <p className="text-muted-foreground">{empleado.direccion}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Laboral</CardTitle>
          <CardDescription>Datos laborales y de contacto.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant={empleado.estado === "Activo" ? "default" : "secondary"}
                className={
                  empleado.estado === "Activo"
                    ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                }
              >
                {empleado.estado}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Cargo</p>
                <p className="text-muted-foreground">{empleado.cargo}</p>
              </div>
            </div>

            {empleado.turno && (
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Turno Asignado</p>
                  <p className="text-muted-foreground">{empleado.turno}</p>
                </div>
              </div>
            )}

            {empleado.tipoContrato && (
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Tipo de Contrato</p>
                  <p className="text-muted-foreground">{empleado.tipoContrato}</p>
                </div>
              </div>
            )}

            <Separator />

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Celular</p>
                <p className="text-muted-foreground">{empleado.celular}</p>
              </div>
            </div>

            {empleado.telefono && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-muted-foreground">{empleado.telefono}</p>
                </div>
              </div>
            )}

            {empleado.email && (
              <div className="flex items-start gap-3">
                <AtSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Correo Electrónico</p>
                  <p className="text-muted-foreground">{empleado.email}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
