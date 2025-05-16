import { Suspense } from "react"
import BackButton from "@/components/ui/back-button"
import { OrdenDetalle } from "@/components/ordenes/orden-detalle"
import { OrdenProductos } from "@/components/ordenes/orden-productos"
import { OrdenHistorial } from "@/components/ordenes/orden-historial"
import { OrdenComentarios } from "@/components/ordenes/orden-comentarios"
import { getOrdenById } from "@/lib/data/ordenes"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Detalle de Orden - ATH Plásticos",
  description: "Ver detalles de una orden de venta",
}

// Función para verificar si un string es un número válido
function isValidNumber(str: string): boolean {
  return !isNaN(Number(str)) && str.trim() !== ""
}

export default function DetalleOrdenPage({ params }: { params: { id: string } }) {
  // Si el ID no es un número válido, mostrar página 404
  if (!isValidNumber(params.id)) {
    notFound()
  }

  const ordenId = Number.parseInt(params.id)
  const orden = getOrdenById(ordenId)

  if (!orden) {
    return (
      <div className="flex flex-col gap-6 p-4 md:p-8">
        <div className="flex items-center">
          <BackButton href="/ordenes" />
          <h1 className="text-2xl font-bold tracking-tight ml-2">Orden no encontrada</h1>
        </div>
        <p>La orden que estás buscando no existe o ha sido eliminada.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center">
        <BackButton href="/ordenes" />
        <h1 className="text-2xl font-bold tracking-tight ml-2">Orden: {orden.codigo}</h1>
      </div>

      {orden.estado !== "ordenAbierta" && (
        <Alert variant="info">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Orden no editable</AlertTitle>
          <AlertDescription>
            Esta orden no puede ser editada porque no está en estado "Orden Abierta". Solo las órdenes en estado inicial
            pueden ser modificadas.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Suspense fallback={<div>Cargando detalles...</div>}>
            <OrdenDetalle orden={orden} />
          </Suspense>

          <Suspense fallback={<div>Cargando productos...</div>}>
            <OrdenProductos productos={orden.productos} />
          </Suspense>
        </div>

        <div className="space-y-6">
          <Suspense fallback={<div>Cargando historial...</div>}>
            <OrdenHistorial historial={orden.historialEstados} />
          </Suspense>

          <Suspense fallback={<div>Cargando comentarios...</div>}>
            <OrdenComentarios comentarios={orden.comentarios} ordenId={orden.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
