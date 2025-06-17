import { notFound } from "next/navigation"
import { getOrdenCompraById } from "@/lib/data/ordenes-compra-nuevo"
import { OrdenCompraDetalle } from "@/components/ordenes-compra-nuevo/orden-compra-detalle"
import { BackButton } from "@/components/ui/back-button"

interface OrdenCompraPageProps {
  params: {
    id: string
  }
}

export default async function OrdenCompraPage({ params }: OrdenCompraPageProps) {
  const orden = await getOrdenCompraById(params.id)

  if (!orden) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orden de Compra {orden.numero}</h1>
          <p className="text-muted-foreground">Detalles de la orden de compra</p>
        </div>
      </div>

      <OrdenCompraDetalle orden={orden} />
    </div>
  )
}
