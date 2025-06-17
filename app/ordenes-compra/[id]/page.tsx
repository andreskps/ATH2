import BackButton from "@/components/ui/back-button"
import { getOrdenCompraById } from "@/lib/data/ordenes-compra"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { OrdenCompraDetalle } from "@/components/ordenes-compra/orden-compra-detalle"
import { OrdenCompraItems } from "@/components/ordenes-compra/orden-compra-items"
import { OrdenCompraHistorial } from "@/components/ordenes-compra/orden-compra-historial"
import { Skeleton } from "@/components/ui/skeleton"
import { OrdenCompraStepper } from "@/components/ordenes-compra/orden-compra-stepper"

interface PageProps {
  params: {
    id: string
  }
}

export default async function OrdenCompraPage({ params }: PageProps) {
  const orden = await getOrdenCompraById(params.id)

  if (!orden) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <BackButton href="/ordenes-compra" />

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orden de Compra #{orden.numero}</h1>
        <p className="text-muted-foreground">Detalles de la orden de compra e historial de cambios</p>
      </div>

      {/* Stepper de progreso */}
      <Suspense fallback={<Skeleton className="h-[100px] w-full" />}>
        <OrdenCompraStepper estado={orden.estado} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
        <OrdenCompraDetalle orden={orden} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <OrdenCompraItems items={orden.items} moneda={orden.moneda} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
        <OrdenCompraHistorial historial={orden.historialCambios} />
      </Suspense>
    </div>
  )
}
