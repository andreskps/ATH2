import { notFound } from "next/navigation"
import { getProgramacionById } from "@/lib/data/programacion"
import { getOrdenById } from "@/lib/data/ordenes"
import { maquinaria } from "@/lib/data/maquinaria"
import { empleados } from "@/lib/data/ordenes"
import BackButton from "@/components/ui/back-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import ProgramacionActions from "@/components/programacion/programacion-actions"

interface ProgramacionDetailPageProps {
  params: {
    id: string
  }
}

export default function ProgramacionDetailPage({ params }: ProgramacionDetailPageProps) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return notFound()
  }

  const programacion = getProgramacionById(id)

  if (!programacion) {
    return notFound()
  }

  const orden = getOrdenById(programacion.ordenId)
  const maquina = maquinaria.find((m) => m.id === programacion.maquinaId)
  const operarios = empleados.filter((e) => programacion.operarioIds.includes(e.id))
  const responsable = empleados.find((e) => e.id === programacion.responsableId)

  // Determinar el color del estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "programada":
        return "bg-yellow-100 text-yellow-800"
      case "enProduccion":
        return "bg-blue-100 text-blue-800"
      case "completada":
        return "bg-green-100 text-green-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center">
          <BackButton href="/programacion" />
          <h1 className="text-2xl font-bold tracking-tight ml-2">Detalle de Programación</h1>
        </div>

        <ProgramacionActions programacion={programacion} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Detalles de la Orden</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Código de Orden</p>
                    <p className="font-medium">{orden?.codigo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cliente</p>
                    <p className="font-medium">{orden?.cliente?.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Entrega</p>
                    <p className="font-medium">
                      {orden?.fechaEntrega ? formatDate(orden.fechaEntrega) : "No definida"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado de la Orden</p>
                    <Badge variant="outline" className={getEstadoColor(orden?.estado || "")}>
                      {orden?.estado}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Detalles de la Programación</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <Badge variant="outline" className={getEstadoColor(programacion.estado)}>
                      {programacion.estado}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Inicio</p>
                    <p className="font-medium">{formatDate(programacion.fechaInicio)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Fin</p>
                    <p className="font-medium">{formatDate(programacion.fechaFin)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Turno</p>
                    <p className="font-medium">{programacion.turno}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">Producción</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cantidad Programada</p>
                  <p className="font-medium">{programacion.cantidadProgramada} unidades</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cantidad Producida</p>
                  <p className="font-medium">{programacion.cantidadProducida} unidades</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progreso</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${(programacion.cantidadProducida / programacion.cantidadProgramada) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1">
                    {Math.round((programacion.cantidadProducida / programacion.cantidadProgramada) * 100)}%
                  </p>
                </div>
              </div>
            </div>

            {programacion.observaciones && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Observaciones</h3>
                <p>{programacion.observaciones}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Máquina</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Nombre</p>
                  <p className="font-medium">{maquina?.nombre}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-medium">{maquina?.tipo}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Asignado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Responsable Principal</p>
                  <p className="font-medium">{responsable?.nombre}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Operarios</p>
                  <div className="space-y-2 mt-2">
                    {operarios.map((operario) => (
                      <div key={operario.id} className="flex items-center justify-between">
                        <p>{operario.nombre}</p>
                        <Badge variant="outline">{operario.rol}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {programacion.parametrosAjustados && (
            <Card>
              <CardHeader>
                <CardTitle>Parámetros Ajustados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(programacion.parametrosAjustados).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm text-muted-foreground">{key}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
