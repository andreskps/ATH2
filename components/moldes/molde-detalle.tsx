"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getMaquinas } from "@/lib/data/maquinaria"
import type { Molde, Maquina } from "@/lib/types"

interface MoldeDetalleProps {
  molde: Molde
}

export default function MoldeDetalle({ molde }: MoldeDetalleProps) {
  const [maquinas, setMaquinas] = useState<Maquina[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        const data = await getMaquinas()
        setMaquinas(data)
      } catch (error) {
        console.error("Error al cargar las máquinas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMaquinas()
  }, [])

  // Función para obtener el color de la badge según el estado
  const getEstadoBadgeVariant = (estado: string) => {
    switch (estado) {
      case "Activo":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
      case "En Mantenimiento":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
      case "Fuera de Servicio":
        return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
      case "En Reparación":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-100"
      case "Obsoleto":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
      default:
        return ""
    }
  }

  // Filtrar las máquinas compatibles
  const maquinasCompatibles = maquinas.filter(
    (maquina) => molde.maquinasCompatibles && molde.maquinasCompatibles.includes(maquina.id.toString()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
        {/* Imagen del molde */}
        <div className="mb-4 md:mb-0 md:w-1/3">
          <div className="overflow-hidden rounded-lg border">
            {molde.imagen ? (
              <Image
                src={molde.imagen || "/placeholder.svg"}
                alt={molde.nombre}
                width={400}
                height={300}
                className="h-auto w-full object-cover"
              />
            ) : (
              <div className="flex h-[300px] w-full items-center justify-center bg-muted">
                <span className="text-muted-foreground">Sin imagen disponible</span>
              </div>
            )}
          </div>
        </div>

        {/* Información general */}
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold">{molde.nombre}</h1>
          <p className="mt-1 text-muted-foreground">Referencia: {molde.referencia}</p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
              <Badge variant="outline" className={`mt-1 ${getEstadoBadgeVariant(molde.estado)}`}>
                {molde.estado}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Tipo de Inyección</h3>
              <p className="mt-1 font-medium">{molde.tipoInyeccion}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Número de Cavidades</h3>
              <p className="mt-1 font-medium">{molde.numeroCavidades}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Área</h3>
              <p className="mt-1 font-medium">{molde.area || "No especificada"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Fecha de Creación</h3>
              <p className="mt-1 font-medium">{molde.fechaCreacion}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Última Actualización</h3>
              <p className="mt-1 font-medium">{molde.fechaActualizacion}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="descripcion" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="dimensiones">Dimensiones</TabsTrigger>
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="maquinas">Máquinas Compatibles</TabsTrigger>
        </TabsList>

        <TabsContent value="descripcion" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
              <CardDescription>Detalles y notas sobre el molde</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Descripción</h3>
                <p className="mt-1 text-muted-foreground">{molde.descripcion || "Sin descripción disponible"}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">Notas</h3>
                <p className="mt-1 text-muted-foreground">{molde.notas || "Sin notas disponibles"}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dimensiones" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Dimensiones</CardTitle>
              <CardDescription>Medidas físicas del molde</CardDescription>
            </CardHeader>
            <CardContent>
              {molde.dimensiones ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Largo</h3>
                    <p className="mt-1 font-medium">{molde.dimensiones.largo} mm</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Ancho</h3>
                    <p className="mt-1 font-medium">{molde.dimensiones.ancho} mm</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Alto</h3>
                    <p className="mt-1 font-medium">{molde.dimensiones.alto} mm</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No hay información de dimensiones disponible</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Productos Asociados</CardTitle>
              <CardDescription>Productos que utilizan este molde</CardDescription>
            </CardHeader>
            <CardContent>
              {molde.productosAsociados && molde.productosAsociados.length > 0 ? (
                <ul className="space-y-2">
                  {molde.productosAsociados.map((productoId) => (
                    <li key={productoId} className="rounded-md border p-3">
                      Producto ID: {productoId}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No hay productos asociados a este molde</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maquinas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Máquinas Compatibles</CardTitle>
              <CardDescription>Máquinas que pueden utilizar este molde</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                </div>
              ) : maquinasCompatibles.length > 0 ? (
                <ul className="space-y-3">
                  {maquinasCompatibles.map((maquina) => (
                    <li key={maquina.id} className="rounded-md border p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{maquina.nombre}</h4>
                          <p className="text-sm text-muted-foreground">Modelo: {maquina.modelo}</p>
                        </div>
                        <Badge variant="outline" className={getEstadoBadgeVariant(maquina.estado)}>
                          {maquina.estado}
                        </Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Tipo: </span>
                          {maquina.tipo}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Fuerza de cierre: </span>
                          {maquina.fuerzaCierre} toneladas
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No hay máquinas compatibles registradas para este molde</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
