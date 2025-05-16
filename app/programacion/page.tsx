import { Suspense } from "react"
import { getOrdenesLiberadas } from "@/lib/data/programacion"
import ProgramacionTableHeader from "@/components/programacion/programacion-table-header"
import ProgramacionFiltros from "@/components/programacion/programacion-filtros"
import ProgramacionTable from "@/components/programacion/programacion-table"
import ProgramacionTableSkeleton from "@/components/programacion/programacion-table-skeleton"

export default function ProgramacionPage() {
  const ordenes = getOrdenesLiberadas()

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <ProgramacionTableHeader />
      <ProgramacionFiltros />
      <Suspense fallback={<ProgramacionTableSkeleton />}>
        <ProgramacionTable ordenes={ordenes} />
      </Suspense>
    </div>
  )
}
