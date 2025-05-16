import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Maquina } from "@/lib/data/maquinaria"

interface MaquinaDetalleProps {
  maquina: Maquina
}

export default function MaquinaDetalle({ maquina }: MaquinaDetalleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de la Máquina</CardTitle>
        <CardDescription>Detalles técnicos y operativos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Código</span>
              <span className="font-medium">{maquina.codigo}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Nombre</span>
              <span>{maquina.nombre}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Modelo</span>
              <span>{maquina.modelo}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Marca</span>
              <span>{maquina.marca}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Tipo</span>
              <span>{maquina.tipo}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Fecha de Adquisición</span>
              <span>{new Date(maquina.fechaAdquisicion).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Ubicación</span>
              <span>{maquina.ubicacion}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Estado</span>
              <div
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold w-fit ${
                  maquina.estado === "Activa"
                    ? "bg-green-100 text-green-800"
                    : maquina.estado === "En Mantenimiento"
                      ? "bg-yellow-100 text-yellow-800"
                      : maquina.estado === "Inactiva"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                }`}
              >
                {maquina.estado}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Capacidad</span>
              <span>{maquina.capacidad}</span>
            </div>
            {maquina.tonelaje && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Tonelaje</span>
                <span>{maquina.tonelaje} toneladas</span>
              </div>
            )}
            {maquina.ciclosPorMinuto && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Ciclos por Minuto</span>
                <span>{maquina.ciclosPorMinuto} ciclos/min</span>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Observaciones</span>
              <span>{maquina.observaciones || "Sin observaciones"}</span>
            </div>
          </div>
        </div>
        {maquina.imagen && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Imagen</h3>
            <div className="rounded-md overflow-hidden border w-full max-w-md">
              <img
                src={maquina.imagen || "/placeholder.svg"}
                alt={maquina.nombre}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
