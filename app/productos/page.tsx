import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import ProductosTable from "@/components/productos/productos-table"
import ProductosTableSkeleton from "@/components/productos/productos-table-skeleton"

export default function ProductosPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
        <p className="text-muted-foreground">Gestiona el catálogo de productos de ATH Plásticos.</p>
      </div>

      <Card>
        <CardContent className="p-0 pt-6">
          <Suspense fallback={<ProductosTableSkeleton />}>
            <ProductosTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
