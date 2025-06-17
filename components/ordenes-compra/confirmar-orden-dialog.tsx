"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ConfirmarOrdenDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ordenId: string
  numeroOrden: string
}

export function ConfirmarOrdenDialog({ open, onOpenChange, ordenId, numeroOrden }: ConfirmarOrdenDialogProps) {
  const [comentarios, setComentarios] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleConfirmar = async () => {
    setIsLoading(true)

    try {
      // Simular llamada a API para confirmar la orden
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Aquí iría la llamada real a la API
      // await confirmarOrdenCompra(ordenId, comentarios)

      toast.success(`Orden de compra #${numeroOrden} confirmada exitosamente`)
      onOpenChange(false)
      router.refresh() // Refrescar la página para mostrar el nuevo estado
    } catch (error) {
      toast.error("Error al confirmar la orden de compra")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Confirmar Orden de Compra
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas confirmar la orden de compra #{numeroOrden}? Una vez confirmada, no podrás
            editarla.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="comentarios">Comentarios de confirmación (opcional)</Label>
            <Textarea
              id="comentarios"
              placeholder="Agregar comentarios sobre la confirmación..."
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmar} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirmar Orden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
