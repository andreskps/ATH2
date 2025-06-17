"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertTriangle } from "lucide-react"
import type { OrdenCompra } from "@/lib/data/ordenes-compra-nuevo"

interface ConfirmarOrdenDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (comentario?: string) => void
  loading: boolean
  orden: OrdenCompra
}

export function ConfirmarOrdenDialog({ open, onOpenChange, onConfirm, loading, orden }: ConfirmarOrdenDialogProps) {
  const [comentario, setComentario] = useState("")

  const handleConfirm = () => {
    onConfirm(comentario.trim() || undefined)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            Confirmar Orden de Compra
          </DialogTitle>
          <DialogDescription>¿Estás seguro de que deseas confirmar la orden {orden.numero}?</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Importante:</p>
                <p className="text-yellow-700 mt-1">
                  Una vez confirmada, la orden no podrá ser editada y se enviará al proveedor.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comentario">Comentario (opcional)</Label>
            <Textarea
              id="comentario"
              placeholder="Agrega un comentario sobre la confirmación..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? "Confirmando..." : "Confirmar Orden"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
