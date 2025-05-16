"use client"

import { Box, Package, Palette, Scale, Timer, Package2, Layers, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Producto } from "@/lib/types"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getMaquinas } from "@/lib/data/maquinaria"

interface ProductoDetalleProps {
  producto: Producto
}

export default function ProductoDetalle({ producto }: ProductoDetalleProps) {
  const [maquinasDisponibles, setMaquinasDisponibles] = useState<any[]>([])

  useEffect(() => {
    const fetchMaquinas = async () => {
      const maquinas = await getMaquinas()
      setMaquinasDisponibles(maquinas)
    }

    fetchMaquinas()
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Información General</CardTitle>
          <CardDescription>Datos generales del producto.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{producto.nombre}</h3>
            <Badge
              variant={
                producto.estado === "Activo" ? "default" : producto.estado === "En Desarrollo" ? "outline" : "secondary"
              }
              className={
                producto.estado === "Activo"
                  ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                  : producto.estado === "En Desarrollo"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
              }
            >
              {producto.estado}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Box className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Código</p>
                <p className="text-muted-foreground">{producto.codigo}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Tipo</p>
                <p className="text-muted-foreground">{producto.tipo}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Palette className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Color</p>
                <p className="text-muted-foreground">{producto.color}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Scale className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Peso</p>
                <p className="text-muted-foreground">{producto.peso} g</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Timer className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Ciclo Teórico</p>
                <p className="text-muted-foreground">{producto.cicloTeorico} s</p>
              </div>
            </div>

            {producto.maquinasCompatibles && producto.maquinasCompatibles.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Máquinas Compatibles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {producto.maquinasCompatibles.map((maquinaId) => {
                    const maquina = maquinasDisponibles.find((m) => m.id === maquinaId)
                    return (
                      <div key={maquinaId} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{maquina ? `${maquina.nombre} (${maquina.modelo})` : `Máquina ID: ${maquinaId}`}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagen del Producto</CardTitle>
          <CardDescription>Vista previa del producto.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {producto.imagen ? (
            <div className="relative h-64 w-64 overflow-hidden rounded-md border">
              <Image
                src={producto.imagen || "/placeholder.svg"}
                alt={producto.nombre}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex h-64 w-64 items-center justify-center rounded-md border bg-muted">
              <span className="text-muted-foreground">No hay imagen disponible</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de Empaque</CardTitle>
          <CardDescription>Datos sobre el empaque del producto.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Package2 className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Tipo de Empaque</p>
              <p className="text-muted-foreground">{producto.tipoEmpaque}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Unidad de Empaque</p>
              <p className="text-muted-foreground">{producto.unidadEmpaque} unidades</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Scale className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Dosificación</p>
              <p className="text-muted-foreground">{producto.dosificacion} g/Kg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Adicional</CardTitle>
          <CardDescription>Fechas y otros datos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Fecha de Creación</p>
              <p className="text-muted-foreground">
                {new Date(producto.fechaCreacion).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="font-medium">Última Actualización</p>
              <p className="text-muted-foreground">
                {new Date(producto.fechaActualizacion).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
