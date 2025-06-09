import { Suspense } from "react"
import { CargosTableHeader } from "@/components/configuracion/cargos/cargos-table-header"
import { CargosTable } from "@/components/configuracion/cargos/cargos-table"
import { CargosFiltros } from "@/components/configuracion/cargos/cargos-filtros"
import { CargosTableSkeleton } from "@/components/configuracion/cargos/cargos-table-skeleton"

export default function CargosPage() {
  return (
    <div className="space-y-6">
      <CargosTableHeader />
      <CargosFiltros />
      <Suspense fallback={<CargosTableSkeleton />}>
        <CargosTable />
      </Suspense>
    </div>
  )
}
