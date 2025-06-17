import { notFound } from "next/navigation"
import { getOrdenCompraById } from "@/lib/data/ordenes-compra-nuevo"
import { OrdenCompraForm } from "@/components/ordenes-compra-nuevo/orden-compra-form"
import { BackButton } from "@/components/ui/back-button"

interface EditarOrdenCompraPageProps {
  params: {
    id: string
  }
}

export default async function EditarOrdenCompraPage({ params }: EditarOrdenCompraPageProps) {
  const orden = await getOrdenCompraById(params.id)

  if (!orden) {
    notFound()
  }

  if (orden.estado !== "creada") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Error</h1>
            <p className="text-muted-foreground">No se puede editar una orden que no está en estado "creada"</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Editar Orden {orden.numero}</h1>
          <p className="text-muted-foreground">Modifica los detalles de la orden de compra</p>
        </div>
      </div>

      <OrdenCompraForm orden={orden} />
    </div>
  )
}
