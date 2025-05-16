import { MapPin, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { DireccionCliente } from "@/lib/types"

interface ClienteDireccionesProps {
  direcciones: DireccionCliente[]
}

export default function ClienteDirecciones({ direcciones }: ClienteDireccionesProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {direcciones.map((direccion) => (
        <Card key={direccion.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative p-4">
              {direccion.esPrincipal && <Badge className="absolute right-4 top-4 bg-primary">Principal</Badge>}
              <div className="space-y-3">
                <div className="flex items-start gap-3 mt-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-muted-foreground">{direccion.direccion}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Ciudad</p>
                    <p className="text-muted-foreground">{direccion.ciudad}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-muted-foreground">{direccion.telefono}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
