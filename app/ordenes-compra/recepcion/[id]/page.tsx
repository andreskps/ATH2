import BackButton from "@/components/ui/back-button"
import { getOrdenCompraById } from "@/lib/data/ordenes-compra"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { RecepcionForm } from "@/components/ordenes-compra/recepcion-form"

interface PageProps {
  params: {
    id: string
  }
}

export default async function RecepcionMaterialPage({ params }: PageProps) {
  const orden = await getOrdenCompraById(params.id)

  if (!orden) {
    notFound()
  }

  // Verificar si la orden está cerrada o completamente recibida
  if (orden.estado === "cerrado") {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <BackButton href={`/ordenes-compra/${params.id}`} />
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Orden Cerrada</h1>
          <p className="text-muted-foreground">
            Esta orden de compra está cerrada y no se pueden registrar más recepciones.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <BackButton href={`/ordenes-compra/${params.id}`} />

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registrar Recepción de Material</h1>
        <p className="text-muted-foreground">
          Orden de Compra #{orden.numero} - {orden.proveedorNombre}
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <RecepcionForm orden={orden} />
      </Suspense>
    </div>
  )
}
