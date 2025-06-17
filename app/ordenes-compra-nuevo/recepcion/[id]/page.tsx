import { notFound } from "next/navigation"
import { getOrdenCompraById } from "@/lib/data/ordenes-compra-nuevo"
import { RecepcionForm } from "@/components/ordenes-compra-nuevo/recepcion-form"
import  BackButton from "@/components/ui/back-button"

interface RecepcionPageProps {
  params: {
    id: string
  }
}

export default async function RecepcionPage({ params }: RecepcionPageProps) {
  const orden = await getOrdenCompraById(params.id)

  if (!orden) {
    notFound()
  }

  if (!["confirmada", "recibida-parcial"].includes(orden.estado)) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Error</h1>
            <p className="text-muted-foreground">
              Solo se pueden recepcionar órdenes confirmadas o parcialmente recibidas
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Registrar Recepción - {orden.numero}</h1>
          <p className="text-muted-foreground">Registra la recepción de materiales de la orden de compra</p>
        </div>
      </div>

      <RecepcionForm orden={orden} />
    </div>
  )
}
