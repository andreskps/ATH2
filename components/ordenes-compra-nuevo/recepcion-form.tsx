"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Save, Package, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { registrarRecepcion, type OrdenCompra } from "@/lib/data/ordenes-compra-nuevo"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface RecepcionFormProps {
  orden: OrdenCompra
}

interface ItemRecepcion {
  ordenCompraItemId: string
  cantidadRecibida: number
  cantidadPendiente: number
}

export function RecepcionForm({ orden }: RecepcionFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [observaciones, setObservaciones] = useState("")
  const [esCompleta, setEsCompleta] = useState(false)

  const [itemsRecepcion, setItemsRecepcion] = useState<ItemRecepcion[]>(
    orden.items.map((item) => ({
      ordenCompraItemId: item.id,
      cantidadRecibida: 0,
      cantidadPendiente: item.cantidad - item.cantidadRecibida,
    })),
  )

  const actualizarCantidadRecibida = (itemId: string, cantidad: number) => {
    setItemsRecepcion((prev) =>
      prev.map((item) =>
        item.ordenCompraItemId === itemId
          ? { ...item, cantidadRecibida: Math.max(0, Math.min(cantidad, item.cantidadPendiente)) }
          : item,
      ),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const itemsConCantidad = itemsRecepcion.filter((item) => item.cantidadRecibida > 0)

    if (itemsConCantidad.length === 0) {
      toast.error("Debes registrar al menos una cantidad recibida")
      return
    }

    if (!observaciones.trim()) {
      toast.error("Las observaciones son obligatorias")
      return
    }

    setLoading(true)

    try {
      const resultado = await registrarRecepcion(orden.id, {
        items: itemsConCantidad.map((item) => ({
          ordenCompraItemId: item.ordenCompraItemId,
          cantidadRecibida: item.cantidadRecibida,
        })),
        observaciones: observaciones.trim(),
        esCompleta,
      })

      if (resultado.success) {
        toast.success(resultado.message)
        router.push(`/ordenes-compra-nuevo/${orden.id}`)
      } else {
        toast.error(resultado.message)
      }
    } catch (error) {
      console.error("Error al registrar recepción:", error)
      toast.error("Error al registrar la recepción")
    } finally {
      setLoading(false)
    }
  }

  const totalItemsConCantidad = itemsRecepcion.filter((item) => item.cantidadRecibida > 0).length

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información de la orden */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Información de la Orden
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Número de Orden</Label>
              <p className="font-semibold">{orden.numero}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Proveedor</Label>
              <p>{orden.proveedorNombre}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Fecha de Emisión</Label>
              <p>{format(new Date(orden.fechaEmision), "dd/MM/yyyy", { locale: es })}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Productos a recepcionar */}
      <Card>
        <CardHeader>
          <CardTitle>Productos a Recepcionar</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materia Prima</TableHead>
                <TableHead>Cantidad Solicitada</TableHead>
                <TableHead>Ya Recibida</TableHead>
                <TableHead>Pendiente</TableHead>
                <TableHead>Cantidad a Recibir</TableHead>
                <TableHead>Unidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orden.items.map((item, index) => {
                const itemRecepcion = itemsRecepcion[index]
                const cantidadPendiente = item.cantidad - item.cantidadRecibida

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.materiaPrimaNombre}</TableCell>
                    <TableCell>{item.cantidad.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={item.cantidadRecibida > 0 ? "default" : "secondary"}>
                        {item.cantidadRecibida.toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={cantidadPendiente > 0 ? "destructive" : "default"}>
                        {cantidadPendiente.toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max={cantidadPendiente}
                        step="0.01"
                        value={itemRecepcion.cantidadRecibida || ""}
                        onChange={(e) => actualizarCantidadRecibida(item.id, Number.parseFloat(e.target.value) || 0)}
                        className="w-28"
                        disabled={cantidadPendiente === 0}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.unidad}</Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {totalItemsConCantidad > 0 && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>{totalItemsConCantidad}</strong> producto(s) con cantidad a recibir
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Observaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Observaciones de la Recepción</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones *</Label>
            <Textarea
              id="observaciones"
              placeholder="Describe el estado de los materiales recibidos, cualquier incidencia o comentario relevante..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="esCompleta"
              checked={esCompleta}
              onCheckedChange={(checked) => setEsCompleta(checked as boolean)}
            />
            <Label htmlFor="esCompleta" className="text-sm">
              Marcar esta recepción como completa (cerrar orden)
            </Label>
          </div>

          {esCompleta && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">Atención:</p>
                  <p className="text-yellow-700 mt-1">
                    Al marcar como completa, la orden se cerrará y no se podrán registrar más recepciones.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading || totalItemsConCantidad === 0}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Registrando..." : "Registrar Recepción"}
        </Button>
      </div>
    </form>
  )
}
