"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  type Supervision,
  getEstadoSupervisionLabel,
  getEstadoSupervisionColor,
  calcularProgreso,
  formatTiempoTranscurrido,
} from "@/lib/data/supervision"
import { cn } from "@/lib/utils"

interface SupervisionDetalleProps {
  supervision: Supervision
}

export default function SupervisionDetalle({ supervision }: SupervisionDetalleProps) {
  const progreso = calcularProgreso(supervision.cantidadProducida, supervision.cantidadProgramada)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn("capitalize text-base", getEstadoSupervisionColor(supervision.estado))}
              >
                {getEstadoSupervisionLabel(supervision.estado)}
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Última actualización: {formatTiempoTranscurrido(supervision.ultimaActualizacion)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progreso}%</div>
            <div className="mt-2">
              <Progress value={progreso} className="h-2" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {supervision.cantidadProducida.toLocaleString()} de {supervision.cantidadProgramada.toLocaleString()}{" "}
              unidades
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Eficiencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supervision.eficienciaGeneral}%</div>
            <p className="mt-2 text-xs text-muted-foreground">Ciclo promedio: {supervision.cicloPromedio} segundos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Calidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {supervision.cantidadProducida > 0
                ? (100 - (supervision.cantidadDefectuosa / supervision.cantidadProducida) * 100).toFixed(1)
                : 0}
              %
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{supervision.cantidadDefectuosa} unidades defectuosas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Información general</CardTitle>
            <CardDescription>Detalles de la supervisión</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-medium text-muted-foreground">Orden</dt>
                <dd>{supervision.ordenId}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Producto</dt>
                <dd>Producto {supervision.productoId}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Máquina</dt>
                <dd>Máquina {supervision.maquinaId}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Programación</dt>
                <dd>Prog-{supervision.programacionId}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Supervisor</dt>
                <dd>{supervision.supervisor}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Operador</dt>
                <dd>{supervision.operador}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Inicio</dt>
                <dd>{supervision.fechaInicio ? supervision.fechaInicio.toLocaleString() : "Pendiente"}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Fin</dt>
                <dd>{supervision.fechaFin ? supervision.fechaFin.toLocaleString() : "En curso"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tiempos</CardTitle>
            <CardDescription>Análisis de tiempos de producción</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-medium text-muted-foreground">Tiempo total</dt>
                <dd>{supervision.tiempoTotal} minutos</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Tiempo de paradas</dt>
                <dd>{supervision.tiempoParadas} minutos</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Tiempo productivo</dt>
                <dd>{supervision.tiempoTotal - supervision.tiempoParadas} minutos</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Disponibilidad</dt>
                <dd>
                  {supervision.tiempoTotal > 0
                    ? (((supervision.tiempoTotal - supervision.tiempoParadas) / supervision.tiempoTotal) * 100).toFixed(
                        1,
                      )
                    : 0}
                  %
                </dd>
              </div>
            </dl>

            <div className="mt-4">
              <h4 className="mb-2 font-medium">Distribución del tiempo</h4>
              <div className="h-4 rounded-full overflow-hidden bg-muted">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${
                      supervision.tiempoTotal > 0
                        ? ((supervision.tiempoTotal - supervision.tiempoParadas) / supervision.tiempoTotal) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <div className="mt-2 flex text-xs">
                <div className="flex items-center">
                  <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                  <span>Tiempo productivo</span>
                </div>
                <div className="ml-4 flex items-center">
                  <div className="mr-1 h-2 w-2 rounded-full bg-muted" />
                  <span>Paradas</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
