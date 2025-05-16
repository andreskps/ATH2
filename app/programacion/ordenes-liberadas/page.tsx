import { Suspense } from "react"
import { getOrdenes } from "@/lib/data/ordenes"
import BackButton from "@/components/ui/back-button"
import OrdenesLiberadasTable from "@/components/programacion/ordenes-liberadas-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrdenesLiberadasPage() {
  // Obtener todas las órdenes y filtrar solo las que están en estado "liberadaProduccion" o "enProduccion"
  const todasLasOrdenes = getOrdenes()
  const ordenes = todasLasOrdenes.filter(
    (orden) => orden.estado === "liberadaProduccion" || orden.estado === "enProduccion",
  )

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center">
        <BackButton href="/programacion" />
        <h1 className="text-2xl font-bold tracking-tight ml-2">Órdenes Liberadas para Programación</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seleccionar Orden</CardTitle>
          <CardDescription>Seleccione una orden liberada para programar la producción de sus productos</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Cargando órdenes...</div>}>
            <OrdenesLiberadasTable ordenes={ordenes} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
