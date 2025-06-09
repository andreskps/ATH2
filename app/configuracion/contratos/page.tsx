import { Suspense } from "react"
import { ContratosTableHeader } from "@/components/configuracion/contratos/contratos-table-header"
import { ContratosTable } from "@/components/configuracion/contratos/contratos-table"
import { ContratosFiltros } from "@/components/configuracion/contratos/contratos-filtros"
import { ContratosTableSkeleton } from "@/components/configuracion/contratos/contratos-table-skeleton"

export default function ContratosPage() {
  return (
    <div className="space-y-6">
      <ContratosTableHeader />
      <ContratosFiltros />
      <Suspense fallback={<ContratosTableSkeleton />}>
        <ContratosTable />
      </Suspense>
    </div>
  )
}
