"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Package, Factory, FileText, Download, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type Orden, estadosOrden, formasPago } from "@/lib/data/ordenes"
import { OrdenFlujoTrabajo } from "@/components/ordenes/orden-flujo-trabajo"
import { OrdenActions } from "@/components/ordenes/orden-actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface OrdenDetalleProps {
  orden: Orden
}

export function OrdenDetalle({ orden }: OrdenDetalleProps) {
  const estadoInfo = estadosOrden[orden.estado as keyof typeof estadosOrden]
  const [showPdfPreview, setShowPdfPreview] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Acciones de la orden */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Acciones disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdenActions orden={orden} />
        </CardContent>
      </Card>

      {/* Flujo de trabajo */}
      <OrdenFlujoTrabajo orden={orden} />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Información General</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-1 text-sm">
              <dt className="font-medium">Estado:</dt>
              <dd>
                <Badge className={estadoInfo.color}>{estadoInfo.label}</Badge>
              </dd>

              <dt className="font-medium">Fecha de creación:</dt>
              <dd>{format(new Date(orden.fechaCreacion), "dd MMMM yyyy", { locale: es })}</dd>

              {orden.fechaEntrega && (
                <>
                  <dt className="font-medium">Fecha de entrega:</dt>
                  <dd>{format(new Date(orden.fechaEntrega), "dd MMMM yyyy", { locale: es })}</dd>
                </>
              )}

              <dt className="font-medium">Creado por:</dt>
              <dd>{orden.creador}</dd>

              {orden.maquinaAsignada && (
                <>
                  <dt className="font-medium">Máquina asignada:</dt>
                  <dd>{orden.maquinaAsignada}</dd>
                </>
              )}

              {orden.fechaInicioProd && (
                <>
                  <dt className="font-medium">Inicio producción:</dt>
                  <dd>{format(new Date(orden.fechaInicioProd), "dd/MM/yyyy HH:mm", { locale: es })}</dd>
                </>
              )}

              {orden.fechaFinProd && (
                <>
                  <dt className="font-medium">Fin producción:</dt>
                  <dd>{format(new Date(orden.fechaFinProd), "dd/MM/yyyy HH:mm", { locale: es })}</dd>
                </>
              )}
              {orden.cotizacionPdf && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Cotización</h3>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md mt-1">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-blue-700 font-medium flex-1 truncate">{orden.cotizacionPdf}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPdfPreview(true)}
                      className="text-blue-600 hover:text-blue-800 p-1 h-auto"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="text-xs">Ver</span>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 p-1 h-auto"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      <span className="text-xs">Descargar</span>
                    </Button>
                  </div>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-1 text-sm">
              <dt className="font-medium">Nombre:</dt>
              <dd>{orden.cliente?.nombre}</dd>

              <dt className="font-medium">NIT:</dt>
              <dd>{orden.cliente?.nit}</dd>

              <dt className="font-medium">Contacto:</dt>
              <dd>{orden.cliente?.contactoPrincipal?.nombre}</dd>

              <dt className="font-medium">Teléfono:</dt>
              <dd>{orden.cliente?.contactoPrincipal?.telefono}</dd>
            </dl>
          </CardContent>
        </Card>

        {/* Nuevo componente: Resumen de Stock */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resumen de Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Total de productos</div>
                  <div className="text-2xl font-bold">{orden.resumenStock.totalProductos}</div>
                </div>

                <div className={`p-3 rounded-md ${orden.requiereProduccion ? "bg-blue-50" : "bg-green-50"}`}>
                  <div className="text-sm text-muted-foreground">Estado general</div>
                  <div className="flex items-center gap-2">
                    {orden.requiereProduccion ? (
                      <>
                        <Factory className="h-5 w-5 text-blue-600" />
                        <span className="text-blue-600 font-medium">Requiere producción</span>
                      </>
                    ) : (
                      <>
                        <Package className="h-5 w-5 text-green-600" />
                        <span className="text-green-600 font-medium">Completo en inventario</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-green-50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">De inventario</div>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4 text-green-600" />
                    <span className="text-xl font-bold">{orden.resumenStock.productosInventario}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">De producción</div>
                  <div className="flex items-center gap-1">
                    <Factory className="h-4 w-4 text-blue-600" />
                    <span className="text-xl font-bold">{orden.resumenStock.productosProduccion}</span>
                  </div>
                </div>

                <div className="bg-purple-50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Mixtos</div>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      <Package className="h-4 w-4 text-purple-600" />
                      <Factory className="h-4 w-4 text-purple-600 -ml-1" />
                    </div>
                    <span className="text-xl font-bold">{orden.resumenStock.productosMixtos}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Detalles de Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-1 text-sm">
              <dt className="font-medium">Forma de pago:</dt>
              <dd>{formasPago[orden.formaPago as keyof typeof formasPago]}</dd>

              <dt className="font-medium">Subtotal:</dt>
              <dd>{formatCurrency(orden.subtotal)}</dd>

              <dt className="font-medium">Descuento:</dt>
              <dd>- {formatCurrency(orden.descuento)}</dd>

              <dt className="font-medium">Impuestos:</dt>
              <dd>{formatCurrency(orden.impuestos)}</dd>

              <dt className="font-medium text-lg">Total:</dt>
              <dd className="font-bold text-lg">{formatCurrency(orden.total)}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Dirección de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-1 text-sm">
              {orden.cliente?.direcciones
                ?.filter((d) => d.esPrincipal)
                .map((direccion) => (
                  <div key={direccion.id}>
                    <dt className="font-medium">Dirección principal:</dt>
                    <dd>{direccion.direccion}</dd>

                    <dt className="font-medium">Ciudad:</dt>
                    <dd>{direccion.ciudad}</dd>

                    <dt className="font-medium">Teléfono:</dt>
                    <dd>{direccion.telefono}</dd>
                  </div>
                ))}
            </dl>
          </CardContent>
        </Card>
      </div>
      {/* Diálogo para vista previa del PDF */}
      <Dialog open={showPdfPreview} onOpenChange={setShowPdfPreview}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Vista previa de cotización</DialogTitle>
          </DialogHeader>
          <div className="w-full h-full min-h-[60vh]">
            {/* En una aplicación real, aquí se cargaría el PDF desde el servidor */}
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
              <p className="text-gray-500">
                Vista previa no disponible en este entorno de demostración.
                <br />
                En una aplicación real, aquí se mostraría el PDF.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
