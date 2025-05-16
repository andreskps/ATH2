"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { OrdenCompra } from "@/lib/data/ordenes-compra"
import { formatCurrency, formatDate } from "@/lib/utils"
import { AlertCircle, Calendar, FileEdit, Truck, User, X } from "lucide-react"
import Link from "next/link"

interface OrdenCompraDetalleProps {
  orden: OrdenCompra
}

export function OrdenCompraDetalle({ orden }: OrdenCompraDetalleProps) {
  // Función para obtener el color de la badge según el estado
  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "creado":
        return "outline"
      case "recibido-parcial":
        return "secondary"
      case "recibido":
        return "default"
      case "cerrado":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Función para formatear el estado para mostrar
  const formatearEstado = (estado: string) => {
    switch (estado) {
      case "creado":
        return "Creado"
      case "recibido-parcial":
        return "Recibido Parcial"
      case "recibido":
        return "Recibido"
      case "cerrado":
        return "Cerrado"
      default:
        return estado
    }
  }

  return (
    <div className="space-y-6">
      {/* Alerta de orden cerrada */}
      {orden.estado === "cerrado" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Orden cerrada</AlertTitle>
          <AlertDescription>Esta orden de compra está cerrada y no puede ser modificada.</AlertDescription>
        </Alert>
      )}

      {/* Alerta de orden recibida */}
      {orden.estado === "recibido" && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Orden completada</AlertTitle>
          <AlertDescription>
            Esta orden de compra ha sido recibida completamente y no puede ser modificada.
          </AlertDescription>
        </Alert>
      )}

      {/* Información general de la orden */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex justify-between items-center">
            <span>Orden de Compra #{orden.numero}</span>
            <Badge variant={getBadgeVariant(orden.estado)}>{formatearEstado(orden.estado)}</Badge>
          </CardTitle>
          <CardDescription>Emitida el {formatDate(orden.fechaEmision)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Proveedor</h3>
                <p className="text-lg font-semibold">{orden.proveedorNombre}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Fecha emisión</h3>
                <p className="text-lg font-semibold flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(orden.fechaEmision)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Fecha entrega estimada</h3>
                <p className="text-lg font-semibold flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(orden.fechaEntregaEstimada)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Responsable</h3>
                <p className="text-lg font-semibold flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {orden.usuarioResponsableNombre}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
                <p className="text-xl font-bold">{formatCurrency(orden.total, orden.moneda)}</p>
              </div>

              <div className="pt-2">
                {/* Botones de acción según el estado */}
                <div className="flex flex-wrap gap-2">
                  {/* Solo mostrar editar si no está recibido o cerrado */}
                  {["creado", "recibido-parcial"].includes(orden.estado) && (
                    <Link href={`/ordenes-compra/editar/${orden.id}`}>
                      <Button className="flex items-center">
                        <FileEdit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                    </Link>
                  )}

                  {/* Solo mostrar registrar recepción si no está recibido o cerrado */}
                  {["creado", "recibido-parcial"].includes(orden.estado) && (
                    <Link href={`/ordenes-compra/recepciones/nueva?ordenCompraId=${orden.id}`}>
                      <Button variant="secondary" className="flex items-center">
                        <Truck className="mr-2 h-4 w-4" />
                        Registrar recepción
                      </Button>
                    </Link>
                  )}

                  {/* Solo mostrar cancelar si está creado o recibido parcial */}
                  {["creado", "recibido-parcial"].includes(orden.estado) && (
                    <Button variant="destructive" className="flex items-center">
                      <X className="mr-2 h-4 w-4" />
                      Cancelar orden
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Comentarios */}
          {orden.comentarios && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Comentarios</h3>
              <div className="bg-muted p-3 rounded-md text-sm">{orden.comentarios}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
