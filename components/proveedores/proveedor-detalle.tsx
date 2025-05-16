import Image from "next/image"
import type { Proveedor } from "@/lib/data/proveedores"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Mail, Phone, MapPin, Calendar, CreditCard } from "lucide-react"

interface ProveedorDetalleProps {
  proveedor: Proveedor
}

export default function ProveedorDetalle({ proveedor }: ProveedorDetalleProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Información General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
            {proveedor.logo ? (
              <div className="relative h-24 w-24 overflow-hidden rounded-md">
                <Image
                  src={proveedor.logo || "/placeholder.svg"}
                  alt={proveedor.nombre}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-md bg-muted">
                <span className="text-2xl font-medium">{proveedor.nombre.substring(0, 2).toUpperCase()}</span>
              </div>
            )}
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-semibold">{proveedor.nombre}</h3>
              <p className="text-sm text-muted-foreground">NIT: {proveedor.nit}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Badge variant="outline">{proveedor.tipo}</Badge>
                <Badge variant={proveedor.estado === "Activo" ? "success" : "destructive"}>{proveedor.estado}</Badge>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{proveedor.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{proveedor.celular}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>
                {proveedor.direccion}, {proveedor.ciudad}, {proveedor.departamento}, {proveedor.pais}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Registrado el {formatDate(proveedor.createdAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Condiciones Comerciales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Condiciones de Pago</h4>
            <p>{proveedor.condicionesPago}</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Forma de Pago Preferida</h4>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span>{proveedor.formaPago}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Observaciones</h4>
            <p className="text-sm text-muted-foreground">{proveedor.observaciones}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
