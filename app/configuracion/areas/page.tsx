import { Suspense } from "react"
import { AreasTableHeader } from "@/components/configuracion/areas/areas-table-header"
import { AreasTable } from "@/components/configuracion/areas/areas-table"
import { AreasFiltros } from "@/components/configuracion/areas/areas-filtros"
import { AreasTableSkeleton } from "@/components/configuracion/areas/areas-table-skeleton"

export default function AreasPage() {
  return (
    <div className="space-y-6">
      <AreasTableHeader />
      <AreasFiltros />
      <Suspense fallback={<AreasTableSkeleton />}>
        <AreasTable />
      </Suspense>
    </div>
  )
}
