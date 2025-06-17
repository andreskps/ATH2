"use client"

import type React from "react"

import { useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface ConfirmarOrdenDialogProps {
  ordenId: string
  numeroOrden: string
  children: React.ReactNode
}

export function ConfirmarOrdenDialog({ ordenId, numeroOrden, children }: ConfirmarOrdenDialogProps) {
  const [open, setOpen] = useState(false)
  const [comentario, setComentario] = useState("")
  const [isConfirming, setIsConfirming] = useState(false)
  const router = useRouter()

  const handleConfirmar = async () => {
    setIsConfirming(true)

    try {
      // Aquí iría la lógica para confirmar la orden
      console.log("Confirmando orden:", { ordenId, comentario })

      // Simular retraso de red
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Cerrar el diálogo y refrescar la página
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error al confirmar la orden:", error)
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar Orden de Compra</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas confirmar la orden {numeroOrden}? Una vez confirmada, la orden será enviada al
            proveedor y no podrá ser editada.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="comentario">Comentario de confirmación (opcional)</Label>
            <Textarea
              id="comentario"
              placeholder="Agregar comentario sobre la confirmación..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isConfirming}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmar} disabled={isConfirming}>
            {isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirmando...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Confirmar Orden
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
