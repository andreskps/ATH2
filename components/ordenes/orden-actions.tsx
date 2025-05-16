"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Edit,
  FileText,
  CheckCircle,
  ArrowRight,
  Factory,
  Truck,
  Package,
  Send,
  CreditCard,
  Clock,
  Wrench,
  CheckSquare,
  Microscope,
  ShieldCheck,
  Recycle,
  RotateCcw,
  XCircle,
  FileEdit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrdenCambioEstadoDialog } from "@/components/ordenes/orden-cambio-estado-dialog"
import { type Orden, getRolUsuarioActual, getTransicionesDisponibles } from "@/lib/data/ordenes"

interface OrdenActionsProps {
  orden: Orden
}

export function OrdenActions({ orden }: OrdenActionsProps) {
  const router = useRouter()
  const [showCambioEstadoDialog, setShowCambioEstadoDialog] = useState(false)
  const [transicionSeleccionada, setTransicionSeleccionada] = useState<any>(null)

  const rolUsuario = getRolUsuarioActual()
  const transicionesDisponibles = getTransicionesDisponibles(orden.estado, rolUsuario)

  const handleTransicion = (transicion: any) => {
    setTransicionSeleccionada(transicion)
    setShowCambioEstadoDialog(true)
  }

  // Obtener el icono para un estado
  const getIconoEstado = (estado: string) => {
    const iconos: Record<string, any> = {
      borrador: FileEdit,
      enviada: Send,
      aprobada: CheckCircle,
      porConfirmarPago: CreditCard,
      pagoConfirmado: CheckCircle,
      enEspera: Clock,
      asignada: Wrench,
      enProduccion: Factory,
      produccionCompleta: CheckSquare,
      enValidacion: Microscope,
      validada: ShieldCheck,
      enDespacho: Truck,
      entregada: Package,
      enMolido: Recycle,
      devuelta: RotateCcw,
      cancelada: XCircle,
    }

    const IconComponent = iconos[estado] || ArrowRight
    return <IconComponent className="h-4 w-4 mr-2" />
  }

  return (
    <>
      {/* Botones de acción principales */}
      <div className="flex flex-wrap gap-2 mb-4">
        {transicionesDisponibles.map((transicion) => (
          <Button
            key={transicion.estado}
            variant={transicion.estado === "cancelada" ? "destructive" : "default"}
            size="sm"
            onClick={() => handleTransicion(transicion)}
            className="flex items-center"
          >
            {getIconoEstado(transicion.estado)}
            {transicion.label}
          </Button>
        ))}

        {orden.estado === "ordenAbierta" && (
          <Button variant="outline" size="sm" asChild>
            <Link href={`/ordenes/editar/${orden.id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar orden
            </Link>
          </Button>
        )}

        <Button variant="outline" size="sm" asChild>
          <Link href={`/ordenes/${orden.id}/imprimir`}>
            <FileText className="h-4 w-4 mr-2" />
            Imprimir orden
          </Link>
        </Button>
      </div>

      {showCambioEstadoDialog && transicionSeleccionada && (
        <OrdenCambioEstadoDialog
          open={showCambioEstadoDialog}
          onOpenChange={setShowCambioEstadoDialog}
          orden={orden}
          transicion={transicionSeleccionada}
          onComplete={() => {
            setShowCambioEstadoDialog(false)
            router.refresh()
          }}
        />
      )}
    </>
  )
}
