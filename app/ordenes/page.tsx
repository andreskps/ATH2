import { OrdenesFiltros } from "@/components/ordenes/ordenes-filtros"
import { OrdenesTable } from "@/components/ordenes/ordenes-table"
import { OrdenesTableHeader } from "@/components/ordenes/ordenes-table-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrdenesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <OrdenesTableHeader />
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Órdenes de Venta</CardTitle>
          <CardDescription>
            Gestiona las órdenes de venta de productos. Crea, edita y da seguimiento al estado de cada orden.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <OrdenesFiltros />
            <OrdenesTable />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
