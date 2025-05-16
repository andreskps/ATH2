import { Building2, MapPin, Phone, Mail, CreditCard, User, CalendarClock, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Cliente } from "@/lib/types"
import ClienteDirecciones from "./cliente-direcciones"

interface ClienteDetalleProps {
  cliente: Cliente
}

export default function ClienteDetalle({ cliente }: ClienteDetalleProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Información General</CardTitle>
          <CardDescription>Datos generales del cliente.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{cliente.nombre}</h3>
            <Badge
              variant={cliente.estado === "Activo" ? "default" : "secondary"}
              className={
                cliente.estado === "Activo"
                  ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
              }
            >
              {cliente.estado}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">NIT</p>
                <p className="text-muted-foreground">{cliente.nit}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Ciudad</p>
                <p className="text-muted-foreground">{cliente.ciudad}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Teléfono</p>
                <p className="text-muted-foreground">{cliente.telefono}</p>
              </div>
            </div>

            {cliente.email && (
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Correo Electrónico</p>
                  <p className="text-muted-foreground">{cliente.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Modo de Pago</p>
                <p className="text-muted-foreground">{cliente.modoPago}</p>
              </div>
            </div>

            <div>
              <p className="font-medium">Comercial Asignado</p>
              <p className="text-muted-foreground">
                {cliente.comercialId === "1" && "Juan Pérez"}
                {cliente.comercialId === "2" && "María Rodríguez"}
                {cliente.comercialId === "3" && "Carlos Gómez"}
                {cliente.comercialId === "4" && "Laura Martínez"}
                {cliente.comercialId === "5" && "Roberto Sánchez"}
                {!cliente.comercialId && "No asignado"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Adicional</CardTitle>
          <CardDescription>Datos adicionales y contacto.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {cliente.contactoPrincipal && (
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Contacto Principal</p>
                <p className="text-muted-foreground">
                  {cliente.contactoPrincipal.nombre} - {cliente.contactoPrincipal.telefono}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <CalendarClock className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Fecha de Creación</p>
              <p className="text-muted-foreground">
                {new Date(cliente.fechaCreacion).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {cliente.ultimaCompra && (
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Última Compra</p>
                <p className="text-muted-foreground">
                  {new Date(cliente.ultimaCompra).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}

          {cliente.observaciones && (
            <>
              <Separator />
              <div>
                <p className="font-medium mb-2">Observaciones</p>
                <p className="text-muted-foreground">{cliente.observaciones}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Direcciones</CardTitle>
          <CardDescription>Direcciones asociadas al cliente.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClienteDirecciones direcciones={cliente.direcciones} />
        </CardContent>
      </Card>
    </div>
  )
}
