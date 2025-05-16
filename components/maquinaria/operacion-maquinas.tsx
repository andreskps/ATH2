"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiltrosOperacion } from "./filtros-operacion"
import { MaquinaEstadoCard } from "./maquina-estado-card"
import { useMaquinariaOperacion } from "@/hooks/use-maquinaria-operacion"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function OperacionMaquinas() {
  const [areaSeleccionada, setAreaSeleccionada] = useState<string>("todas")
  const [estadoFiltro, setEstadoFiltro] = useState<string>("todos")
  const [operadorFiltro, setOperadorFiltro] = useState<string>("")

  const { maquinasEnOperacion, areas, isLoading, error, refetch } = useMaquinariaOperacion()

  // Actualizar datos cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 30000)

    return () => clearInterval(interval)
  }, [refetch])

  // Filtrar máquinas por área y otros filtros
  const maquinasFiltradas = maquinasEnOperacion.filter((maquina) => {
    const matchArea = areaSeleccionada === "todas" || maquina.ubicacion === areaSeleccionada
    const matchEstado = estadoFiltro === "todos" || maquina.estadoOperacion === estadoFiltro
    const matchOperador =
      !operadorFiltro ||
      (maquina.operador && maquina.operador.nombre.toLowerCase().includes(operadorFiltro.toLowerCase()))

    return matchArea && matchEstado && matchOperador
  })

  // Agrupar máquinas por área para la vista de pestañas
  const maquinasPorArea = areas.reduce(
    (acc, area) => {
      acc[area] = maquinasFiltradas.filter((m) => m.ubicacion === area)
      return acc
    },
    {} as Record<string, typeof maquinasFiltradas>,
  )

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          No se pudieron cargar los datos de operación. Por favor, intente nuevamente.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Monitoreo de Operación</CardTitle>
            <CardDescription>Estado actual de las máquinas en producción</CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">Última actualización: {new Date().toLocaleTimeString()}</div>
        </div>
      </CardHeader>
      <CardContent>
        <FiltrosOperacion
          areas={areas}
          areaSeleccionada={areaSeleccionada}
          setAreaSeleccionada={setAreaSeleccionada}
          estadoFiltro={estadoFiltro}
          setEstadoFiltro={setEstadoFiltro}
          operadorFiltro={operadorFiltro}
          setOperadorFiltro={setOperadorFiltro}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <div className="flex justify-between mt-4">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {maquinasFiltradas.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No hay máquinas que coincidan con los filtros seleccionados.</p>
              </div>
            ) : (
              <Tabs defaultValue="todas" className="mt-6">
                <TabsList className="mb-4 flex flex-wrap h-auto">
                  <TabsTrigger value="todas">Todas ({maquinasFiltradas.length})</TabsTrigger>
                  {areas.map((area) => (
                    <TabsTrigger key={area} value={area}>
                      {area} ({maquinasPorArea[area]?.length || 0})
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="todas">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {maquinasFiltradas.map((maquina) => (
                      <MaquinaEstadoCard key={maquina.id} maquina={maquina} />
                    ))}
                  </div>
                </TabsContent>

                {areas.map((area) => (
                  <TabsContent key={area} value={area}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {maquinasPorArea[area]?.map((maquina) => (
                        <MaquinaEstadoCard key={maquina.id} maquina={maquina} />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
