"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { MateriaPrima, ProveedorMateriaPrima } from "@/lib/data/materia-prima"

interface CrearOrdenCompraDialogProps {
  materiaPrima: MateriaPrima
  proveedores?: ProveedorMateriaPrima[]
  children: React.ReactNode
}

export function CrearOrdenCompraDialog({ materiaPrima, proveedores = [], children }: CrearOrdenCompraDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [proveedorId, setProveedorId] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [observaciones, setObservaciones] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // En una aplicación real, aquí se enviaría la información al servidor
    // para crear la orden de compra

    // Redirigir a la página de órdenes de compra
    router.push("/ordenes-compra")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Orden de Compra</DialogTitle>
          <DialogDescription>
            Crea una orden de compra para reponer el stock de {materiaPrima.nombre}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="proveedor" className="col-span-4">
                Proveedor
              </Label>
              <Select value={proveedorId} onValueChange={setProveedorId} required>
                <SelectTrigger className="col-span-4">
                  <SelectValue placeholder="Seleccionar proveedor" />
                </SelectTrigger>
                <SelectContent>
                  {proveedores.length > 0 ? (
                    proveedores.map((proveedor) => (
                      <SelectItem key={proveedor.id} value={proveedor.proveedorId}>
                        {proveedor.proveedorNombre} - ${proveedor.precio.toFixed(2)}/{materiaPrima.unidadMedida}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-proveedores" disabled>
                      No hay proveedores disponibles
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cantidad" className="col-span-4">
                Cantidad ({materiaPrima.unidadMedida})
              </Label>
              <Input
                id="cantidad"
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="col-span-4"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="observaciones" className="col-span-4">
                Observaciones
              </Label>
              <Textarea
                id="observaciones"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                className="col-span-4"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Crear Orden</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
