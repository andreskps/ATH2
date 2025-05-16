"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { type Orden, cambiarEstadoOrden, estadosOrden, maquinaria } from "@/lib/data/ordenes"

interface OrdenCambioEstadoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orden: Orden
  transicion: {
    estado: string
    label: string
  }
  onComplete: () => void
}

export function OrdenCambioEstadoDialog({
  open,
  onOpenChange,
  orden,
  transicion,
  onComplete,
}: OrdenCambioEstadoDialogProps) {
  const router = useRouter()
  const [comentario, setComentario] = useState("")
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const esCancelacion = transicion.estado === "cancelada"
  const estadoActual = estadosOrden[orden.estado as keyof typeof estadosOrden]?.label || orden.estado
  const nuevoEstado = estadosOrden[transicion.estado as keyof typeof estadosOrden]?.label || transicion.estado

  // Determinar si necesitamos campos adicionales según el estado destino
  const requiereMaquina = transicion.estado === "asignada"
  const maquinasDisponibles = maquinaria.filter((m) => m.disponible)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Preparar datos adicionales según el estado
      const datosAdicionales: Record<string, any> = {}

      if (requiereMaquina && maquinaSeleccionada) {
        datosAdicionales.maquinaAsignada = maquinaSeleccionada
      }

      // En una app real, el usuario vendría de la sesión
      await cambiarEstadoOrden(orden.id, transicion.estado, "Usuario Actual", comentario, datosAdicionales)

      onComplete()
      router.refresh()
    } catch (error) {
      console.error("Error al cambiar estado:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {esCancelacion ? (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            {transicion.label}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 pt-2">
            <span className="font-medium">{estadoActual}</span>
            <ArrowRight className="h-4 w-4" />
            <span className="font-medium">{nuevoEstado}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {requiereMaquina && (
              <div className="space-y-2">
                <Label htmlFor="maquina">Máquina a asignar</Label>
                <Select value={maquinaSeleccionada} onValueChange={setMaquinaSeleccionada} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar máquina" />
                  </SelectTrigger>
                  <SelectContent>
                    {maquinasDisponibles.map((maquina) => (
                      <SelectItem key={maquina.id} value={maquina.nombre}>
                        {maquina.nombre} - {maquina.tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="comentario">Comentario {esCancelacion && "(obligatorio)"}</Label>
              <Textarea
                id="comentario"
                placeholder="Añade un comentario sobre este cambio de estado..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                required={esCancelacion}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant={esCancelacion ? "destructive" : "default"}
              disabled={isLoading || (esCancelacion && !comentario.trim()) || (requiereMaquina && !maquinaSeleccionada)}
            >
              {isLoading ? "Procesando..." : esCancelacion ? "Cancelar orden" : "Confirmar cambio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
