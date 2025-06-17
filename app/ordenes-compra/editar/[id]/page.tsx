import { notFound } from "next/navigation"
import { OrdenCompraForm } from "@/components/ordenes-compra/orden-compra-form"
import { getOrdenCompraById } from "@/lib/data/ordenes-compra"

interface EditarOrdenCompraPageProps {
  params: {
    id: string
  }
}

export default async function EditarOrdenCompraPage({ params }: EditarOrdenCompraPageProps) {
  const ordenCompra = await getOrdenCompraById(params.id)

  if (!ordenCompra) {
    notFound()
  }

  // Actualizar la validación para permitir editar solo órdenes en estado "creada":
  if (ordenCompra.estado !== "creada") {
    return (
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">No se puede editar esta orden</h1>
          <p className="text-muted-foreground mb-6">
            Solo las órdenes de compra en estado "creada" pueden ser editadas. Esta orden está en estado "
            {ordenCompra.estado}".
          </p>
          <a href="/ordenes-compra" className="text-primary hover:underline">
            Volver a la lista de órdenes de compra
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <OrdenCompraForm ordenCompra={ordenCompra} isEditing />
    </div>
  )
}
