import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getMateriaPrimaById } from "@/lib/data/materia-prima"
import { MateriaPrimaDetalle } from "@/components/materia-prima/materia-prima-detalle"
import { MateriaPrimaHistorialMovimientos } from "@/components/materia-prima/materia-prima-historial-movimientos"
import BackButton  from "@/components/ui/back-button"
import { Separator } from "@/components/ui/separator"

interface MateriaPrimaDetallePageProps {
  params: {
    id: string
  }
}

export default async function MateriaPrimaDetallePage({ params }: MateriaPrimaDetallePageProps) {
  const materiaPrima = await getMateriaPrimaById(params.id)

  if (!materiaPrima) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <BackButton href="/materia-prima">Volver a Materia Prima</BackButton>
          <h2 className="text-2xl font-bold tracking-tight">{materiaPrima.nombre}</h2>
          <p className="text-muted-foreground">Detalle de la materia prima y su inventario</p>
        </div>
      </div>
      <Separator className="my-6" />

      <MateriaPrimaDetalle materiaPrima={materiaPrima} />

      <div className="mt-8">
        <Suspense fallback={<div>Cargando historial de movimientos...</div>}>
          <MateriaPrimaHistorialMovimientos materiaPrimaId={materiaPrima.id} />
        </Suspense>
      </div>
    </div>
  )
}
