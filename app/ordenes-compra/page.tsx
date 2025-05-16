import { Suspense } from "react"
import { OrdenesCompraTableHeader } from "@/components/ordenes-compra/ordenes-compra-table-header"
import { OrdenesCompraTable } from "@/components/ordenes-compra/ordenes-compra-table"
import { OrdenesCompraTableSkeleton } from "@/components/ordenes-compra/ordenes-compra-table-skeleton"
import { OrdenesCompraFiltros } from "@/components/ordenes-compra/ordenes-compra-filtros"

export default function OrdenesCompraPage() {
  return (
    <div className="container py-6">
      <OrdenesCompraTableHeader />
      <OrdenesCompraFiltros />
      <Suspense fallback={<OrdenesCompraTableSkeleton />}>
        <OrdenesCompraTable />
      </Suspense>
    </div>
  )
}
