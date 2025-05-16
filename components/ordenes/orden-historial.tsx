import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type CambioEstado, estadosOrden } from "@/lib/data/ordenes"

interface OrdenHistorialProps {
  historial: CambioEstado[]
}

export function OrdenHistorial({ historial }: OrdenHistorialProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Historial de Estados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l">
          {historial.map((cambio, index) => {
            const estadoInfo = estadosOrden[cambio.estadoNuevo as keyof typeof estadosOrden]

            return (
              <div key={cambio.id} className="mb-4 relative">
                <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-primary"></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={estadoInfo?.color || "bg-gray-200"}>
                      {estadoInfo?.label || cambio.estadoNuevo}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(cambio.fecha), "dd MMM yyyy, HH:mm", { locale: es })}
                    </span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">{cambio.usuario}</span>
                    {cambio.estadoAnterior ? (
                      <>
                        {" "}
                        cambió el estado de{" "}
                        <span className="italic">
                          {estadosOrden[cambio.estadoAnterior as keyof typeof estadosOrden]?.label ||
                            cambio.estadoAnterior}
                        </span>{" "}
                        a <span className="italic">{estadoInfo?.label || cambio.estadoNuevo}</span>
                      </>
                    ) : (
                      <>
                        {" "}
                        creó la orden en estado{" "}
                        <span className="italic">{estadoInfo?.label || cambio.estadoNuevo}</span>
                      </>
                    )}
                  </p>
                  {cambio.comentario && <p className="text-sm text-muted-foreground">{cambio.comentario}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
