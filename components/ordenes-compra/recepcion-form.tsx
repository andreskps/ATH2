"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type OrdenCompra, registrarRecepcion } from "@/lib/data/ordenes-compra"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface RecepcionFormProps {
  orden: OrdenCompra
}

export function RecepcionForm({ orden }: RecepcionFormProps) {
  const router = useRouter()
  const [cantidades, setCantidades] = useState<Record<string, number>>(
    Object.fromEntries(orden.items.map((item) => [item.id, 0])),
  )
  const [observaciones, setObservaciones] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [esRecepcionCompleta, setEsRecepcionCompleta] = useState(false)

  // Verificar si hay cantidades pendientes para cada ítem
  const itemsPendientes = orden.items.map((item) => {
    const pendiente = item.cantidad - item.cantidadRecibida
    return {
      ...item,
      pendiente,
      hayCantidadPendiente: pendiente > 0,
    }
  })

  // Verificar si todos los ítems están completos
  const todosItemsCompletos = itemsPendientes.every((item) => !item.hayCantidadPendiente)

  // Verificar si hay alguna cantidad ingresada
  const hayCantidadesIngresadas = Object.values(cantidades).some((cantidad) => cantidad > 0)

  // Manejar cambio de cantidad
  const handleCantidadChange = (itemId: string, value: string) => {
    const cantidad = Number.parseFloat(value) || 0
    setCantidades((prev) => ({
      ...prev,
      [itemId]: cantidad,
    }))
  }

  // Validar cantidades
  const validarCantidades = () => {
    for (const item of itemsPendientes) {
      const cantidadIngresada = cantidades[item.id] || 0
      if (cantidadIngresada <= 0) continue // Ignorar ítems sin cantidad

      if (cantidadIngresada > item.pendiente) {
        setError(
          `La cantidad ingresada (${cantidadIngresada}) para ${item.materiaPrimaNombre} excede la cantidad pendiente (${item.pendiente})`,
        )
        return false
      }
    }
    return true
  }

  // Preparar datos para enviar
  const prepararDatosRecepcion = (esCompleta: boolean) => {
    return {
      items: Object.entries(cantidades)
        .filter(([_, cantidad]) => cantidad > 0)
        .map(([itemId, cantidadRecibida]) => ({
          ordenCompraItemId: itemId,
          cantidadRecibida,
        })),
      observaciones,
      esCompleta,
    }
  }

  // Manejar envío del formulario
  const handleSubmit = async (esCompleta: boolean) => {
    setError(null)
    setSuccess(null)

    if (!hayCantidadesIngresadas) {
      setError("Debe ingresar al menos una cantidad para registrar la recepción")
      return
    }

    if (!validarCantidades()) {
      return
    }

    setLoading(true)
    try {
      const datosRecepcion = prepararDatosRecepcion(esCompleta)
      const response = await registrarRecepcion(orden.id, datosRecepcion)

      if (response.success) {
        setSuccess(response.message)
        // Esperar un momento antes de redirigir
        setTimeout(() => {
          router.push(`/ordenes-compra/${orden.id}`)
          router.refresh()
        }, 1500)
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError("Error al registrar la recepción. Intente nuevamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Manejar clic en botón de recepción parcial
  const handleRecepcionParcial = () => {
    if (validarCantidades()) {
      handleSubmit(false)
    }
  }

  // Manejar clic en botón de recepción completa
  const handleConfirmarRecepcionCompleta = () => {
    setEsRecepcionCompleta(true)
    setShowConfirmDialog(true)
  }

  // Confirmar recepción completa
  const confirmarRecepcion = () => {
    setShowConfirmDialog(false)
    handleSubmit(true)
  }

  return (
    <div className="space-y-6">
      {/* Alertas */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Éxito</AlertTitle>
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      {/* Información de la orden */}
      <Card>
        <CardHeader>
          <CardTitle>Información de la Orden</CardTitle>
          <CardDescription>Detalles de la orden de compra #{orden.numero}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Proveedor</p>
              <p className="text-lg">{orden.proveedorNombre}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Responsable</p>
              <p className="text-lg">{orden.usuarioResponsableNombre}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estado actual</p>
              <p className="text-lg capitalize">{orden.estado.replace("-", " ")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total</p>
              <p className="text-lg font-bold">{formatCurrency(orden.total, orden.moneda)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulario de recepción */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Recepción</CardTitle>
          <CardDescription>Ingrese las cantidades recibidas para cada material</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Lista de materiales */}
            <div className="space-y-4">
              {itemsPendientes.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4">
                  <div>
                    <Label htmlFor={`cantidad-${item.id}`} className="font-medium">
                      {item.materiaPrimaNombre}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Precio: {formatCurrency(item.precioUnitario, orden.moneda)} / {item.unidad}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm text-muted-foreground">Pendiente</Label>
                      <p className="font-medium">
                        {item.pendiente} {item.unidad}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Recibido anteriormente</Label>
                      <p className="font-medium">
                        {item.cantidadRecibida} {item.unidad}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`cantidad-${item.id}`}>Cantidad a recibir</Label>
                    <div className="flex items-center">
                      <Input
                        id={`cantidad-${item.id}`}
                        type="number"
                        min="0"
                        max={item.pendiente}
                        step="0.01"
                        value={cantidades[item.id] || ""}
                        onChange={(e) => handleCantidadChange(item.id, e.target.value)}
                        disabled={!item.hayCantidadPendiente || loading}
                        className="w-full"
                      />
                      <span className="ml-2">{item.unidad}</span>
                    </div>
                    {!item.hayCantidadPendiente && (
                      <p className="text-sm text-green-600 mt-1">Material completamente recibido</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Observaciones */}
            <div className="space-y-2">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                placeholder="Ingrese observaciones sobre la recepción (opcional)"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                disabled={loading}
                rows={4}
              />
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => router.back()} disabled={loading}>
                Cancelar
              </Button>
              <Button
                variant="secondary"
                onClick={handleRecepcionParcial}
                disabled={!hayCantidadesIngresadas || loading || todosItemsCompletos}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
                  </>
                ) : (
                  "Guardar Recepción Parcial"
                )}
              </Button>
              <Button onClick={handleConfirmarRecepcionCompleta} disabled={!hayCantidadesIngresadas || loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
                  </>
                ) : (
                  "Guardar Recepción Completa"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de confirmación */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Recepción Completa</DialogTitle>
            <DialogDescription>
              {todosItemsCompletos
                ? "¿Está seguro de que desea marcar esta orden como completamente recibida? Esto cerrará la orden y no se podrán realizar más recepciones."
                : "Aún hay materiales pendientes por recibir. ¿Está seguro de que desea marcar esta recepción como completa?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmarRecepcion}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
