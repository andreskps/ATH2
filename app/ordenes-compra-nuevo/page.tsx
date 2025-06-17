import { Suspense } from "react"
import { OrdenesCompraTable } from "@/components/ordenes-compra-nuevo/ordenes-compra-table"
import { OrdenesCompraFiltros } from "@/components/ordenes-compra-nuevo/ordenes-compra-filtros"
import { OrdenesCompraTableSkeleton } from "@/components/ordenes-compra-nuevo/ordenes-compra-table-skeleton"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function OrdenesCompraPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Órdenes de Compra</h1>
          <p className="text-muted-foreground">Gestiona las órdenes de compra de materia prima</p>
        </div>
        <Link href="/ordenes-compra-nuevo/nueva">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Orden de Compra
          </Button>
        </Link>
      </div>

      <OrdenesCompraFiltros />

      <Suspense fallback={<OrdenesCompraTableSkeleton />}>
        <OrdenesCompraTable />
      </Suspense>
    </div>
  )
}
