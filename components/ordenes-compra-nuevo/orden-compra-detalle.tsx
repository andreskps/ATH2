"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Edit, Package, CheckCircle, Clock, User, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { toast } from "sonner"
import { confirmarOrdenCompra, type OrdenCompra, type EstadoOrdenCompra } from "@/lib/data/ordenes-compra-nuevo"
import { OrdenCompraStepper } from "./orden-compra-stepper"
import { ConfirmarOrdenDialog } from "./confirmar-orden-dialog"

const estadoConfig: Record<EstadoOrdenCompra, { label: string; className: string; icon: any }> = {
  creada: { label: "Creada", className: "bg-gray-100 text-gray-800", icon: Clock },
  confirmada: { label: "Confirmada", className: "bg-blue-100 text-blue-800", icon: CheckCircle },
  "recibida-parcial": { label: "Recibida Parcial", className: "bg-yellow-100 text-yellow-800", icon: Package },
  recibida: { label: "Recibida", className: "bg-green-100 text-green-800", icon: CheckCircle },
  cerrada: { label: "Cerrada", className: "bg-purple-100 text-purple-800", icon: CheckCircle },
}

interface OrdenCompraDetalleProps {
  orden: OrdenCompra
}

export function OrdenCompraDetalle({ orden: ordenInicial }: OrdenCompraDetalleProps) {
  const [orden, setOrden] = useState(ordenInicial)
  const [loading, setLoading] = useState(false)
  const [mostrarConfirmarDialog, setMostrarConfirmarDialog] = useState(false)

  const handleConfirmarOrden = async (comentario?: string) => {
    setLoading(true)
    try {
      const resultado = await confirmarOrdenCompra(orden.id, comentario)
      if (resultado.success && resultado.orden) {
        setOrden(resultado.orden)
        toast.success(resultado.message)
        setMostrarConfirmarDialog(false)
      } else {
        toast.error(resultado.message)
      }
    } catch (error) {
      console.error("Error al confirmar orden:", error)
      toast.error("Error al confirmar la orden")
    } finally {
      setLoading(false)
    }
  }

  const EstadoIcon = estadoConfig[orden.estado].icon

  return (
    <div className="space-y-6">
      {/* Stepper de progreso */}
      <OrdenCompraStepper estadoActual={orden.estado} />

      {/* Información principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información de la orden */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Información de la Orden
              </CardTitle>
              <Badge className={estadoConfig[orden.estado].className}>
                <EstadoIcon className="mr-1 h-3 w-3" />
                {estadoConfig[orden.estado].label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Número de Orden</Label>
                <p className="text-lg font-semibold">{orden.numero}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Proveedor</Label>
                <p className="text-lg">{orden.proveedorNombre}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Fecha de Emisión</Label>
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {format(new Date(orden.fechaEmision), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Fecha de Entrega Estimada</Label>
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {format(new Date(orden.fechaEntregaEstimada), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Usuario Responsable</Label>
                <p className="flex items-center gap-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {orden.usuarioResponsableNombre}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Total</Label>
                <p className="text-lg font-semibold text-green-600">
                  ${orden.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })} {orden.moneda}
                </p>
              </div>
            </div>

            {orden.comentarios && (
              <>
                <Separator />
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Comentarios</Label>
                  <p className="mt-1 text-sm bg-muted p-3 rounded-md">{orden.comentarios}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Acciones */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {orden.estado === "creada" && (
              <>
                <Button asChild className="w-full">
                  <Link href={`/ordenes-compra-nuevo/editar/${orden.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Orden
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setMostrarConfirmarDialog(true)}
                  disabled={loading}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirmar Orden
                </Button>
              </>
            )}

            {(orden.estado === "confirmada" || orden.estado === "recibida-parcial") && (
              <Button asChild className="w-full">
                <Link href={`/ordenes-compra-nuevo/recepcion/${orden.id}`}>
                  <Package className="mr-2 h-4 w-4" />
                  Registrar Recepción
                </Link>
              </Button>
            )}

            {orden.estado === "cerrada" && (
              <div className="text-center text-muted-foreground text-sm">
                Esta orden ha sido cerrada y no se pueden realizar más acciones.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Productos */}
      <Card>
        <CardHeader>
          <CardTitle>Productos Solicitados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materia Prima</TableHead>
                <TableHead>Cantidad Solicitada</TableHead>
                <TableHead>Cantidad Recibida</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead>Precio Unitario</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orden.items.map((item) => {
                const porcentajeRecibido = (item.cantidadRecibida / item.cantidad) * 100
                let estadoItem = "Pendiente"
                let colorEstado = "bg-gray-100 text-gray-800"

                if (item.cantidadRecibida === 0) {
                  estadoItem = "Pendiente"
                  colorEstado = "bg-gray-100 text-gray-800"
                } else if (item.cantidadRecibida < item.cantidad) {
                  estadoItem = "Parcial"
                  colorEstado = "bg-yellow-100 text-yellow-800"
                } else {
                  estadoItem = "Completo"
                  colorEstado = "bg-green-100 text-green-800"
                }

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.materiaPrimaNombre}</TableCell>
                    <TableCell>{item.cantidad.toLocaleString()}</TableCell>
                    <TableCell>{item.cantidadRecibida.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.unidad}</Badge>
                    </TableCell>
                    <TableCell>${item.precioUnitario.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>${item.subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>
                      <Badge className={colorEstado}>{estadoItem}</Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Historial de cambios */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Cambios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orden.historialCambios.map((cambio, index) => (
              <div key={cambio.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  {index < orden.historialCambios.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {estadoConfig[cambio.estadoNuevo]?.label || cambio.estadoNuevo}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(cambio.fecha), "dd/MM/yyyy HH:mm", { locale: es })}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{cambio.usuarioNombre}</p>
                  {cambio.comentario && <p className="text-sm text-muted-foreground mt-1">{cambio.comentario}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recepciones */}
      {orden.recepciones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recepciones Registradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {orden.recepciones.map((recepcion) => (
                <div key={recepcion.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">Recepción #{recepcion.id}</h4>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(recepcion.fecha), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
                      </p>
                      <p className="text-sm text-muted-foreground">Recibido por: {recepcion.usuarioNombre}</p>
                    </div>
                    <Badge
                      className={recepcion.esCompleta ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                    >
                      {recepcion.esCompleta ? "Completa" : "Parcial"}
                    </Badge>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material</TableHead>
                        <TableHead>Cantidad Recibida</TableHead>
                        <TableHead>Unidad</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recepcion.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.materiaPrimaNombre}</TableCell>
                          <TableCell>{item.cantidadRecibida.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.unidad}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {recepcion.observaciones && (
                    <div className="mt-4">
                      <Label className="text-sm font-medium text-muted-foreground">Observaciones</Label>
                      <p className="text-sm bg-muted p-3 rounded-md mt-1">{recepcion.observaciones}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Diálogo de confirmación */}
      <ConfirmarOrdenDialog
        open={mostrarConfirmarDialog}
        onOpenChange={setMostrarConfirmarDialog}
        onConfirm={handleConfirmarOrden}
        loading={loading}
        orden={orden}
      />
    </div>
  )
}
