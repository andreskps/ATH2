import BackButton from "@/components/ui/back-button"
import { getRecepciones } from "@/lib/data/ordenes-compra"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { RecepcionDetalle } from "@/components/ordenes-compra/recepcion-detalle"
import { Skeleton } from "@/components/ui/skeleton"

interface PageProps {
  params: {
    id: string
  }
}

export default async function RecepcionDetallePage({ params }: PageProps) {
  // Obtener todas las recepciones
  const recepciones = await getRecepciones()

  // Buscar la recepción específica
  const recepcion = recepciones.find((r) => r.id === params.id)

  if (!recepcion) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <BackButton href="/ordenes-compra/recepciones" />

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Detalle de Recepción</h1>
        <p className="text-muted-foreground">Información detallada de la recepción de material</p>
      </div>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <RecepcionDetalle recepcion={recepcion} />
      </Suspense>
    </div>
  )
}
