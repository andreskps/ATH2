"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { FileEdit, Truck, CheckCircle } from "lucide-react"
import Link from "next/link"
import { ConfirmarOrdenDialog } from "./confirmar-orden-dialog"
import { useState } from "react"

interface OrdenCompraDetalleProps {
  orden: {
    id: string
    numero: string
    proveedorNombre: string
    estado: string
    fechaEmision: string
    usuarioResponsableNombre: string
    comentarios?: string
    moneda: string
    total: number
  }
}

export function OrdenCompraDetalle({ orden }: OrdenCompraDetalleProps) {
  const [showConfirmarDialog, setShowConfirmarDialog] = useState(false)

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "creada":
        return "bg-blue-100 text-blue-800"
      case "confirmada":
        return "bg-purple-100 text-purple-800"
      case "recibida-parcial":
        return "bg-amber-100 text-amber-800"
      case "recibida":
        return "bg-green-100 text-green-800"
      case "cerrada":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case "creada":
        return "Creada"
      case "confirmada":
        return "Confirmada"
      case "recibida-parcial":
        return "Recibida Parcial"
      case "recibida":
        return "Recibida"
      case "cerrada":
        return "Cerrada"
      default:
        return estado
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Información de la Orden</CardTitle>
          <div className="flex gap-2">
            {/* Botón Editar - solo si está en estado "creada" */}
            {orden.estado === "creada" && (
              <Link href={`/ordenes-compra/editar/${orden.id}`}>
                <Button variant="outline" size="sm">
                  <FileEdit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </Link>
            )}

            {/* Botón Confirmar - solo si está en estado "creada" */}
            {orden.estado === "creada" && (
              <Button variant="default" size="sm" onClick={() => setShowConfirmarDialog(true)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirmar Orden
              </Button>
            )}

            {/* Botón Registrar Recepción - solo si está confirmada o recibida parcial */}
            {["confirmada", "recibida-parcial"].includes(orden.estado) && (
              <Link href={`/ordenes-compra/recepcion/${orden.id}`}>
                <Button variant="default" size="sm">
                  <Truck className="mr-2 h-4 w-4" />
                  Registrar Recepción
                </Button>
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Número de Orden</label>
                <p className="text-lg font-semibold">{orden.numero}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Proveedor</label>
                <p className="text-base">{orden.proveedorNombre}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Estado</label>
                <div className="mt-1">
                  <Badge className={getEstadoColor(orden.estado)} variant="outline">
                    {getEstadoTexto(orden.estado)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Fecha de Emisión</label>
                <p className="text-base">
                  {format(new Date(orden.fechaEmision), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Usuario Responsable</label>
                <p className="text-base">{orden.usuarioResponsableNombre}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Total</label>
                <p className="text-lg font-semibold">
                  {orden.moneda} {orden.total.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {orden.comentarios && (
            <div className="mt-6">
              <label className="text-sm font-medium text-muted-foreground">Comentarios</label>
              <p className="text-base mt-1 p-3 bg-muted rounded-md">{orden.comentarios}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmarOrdenDialog
        open={showConfirmarDialog}
        onOpenChange={setShowConfirmarDialog}
        ordenId={orden.id}
        numeroOrden={orden.numero}
      />
    </>
  )
}
