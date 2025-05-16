import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import ClientesTable from "@/components/clientes/clientes-table"
import ClientesTableSkeleton from "@/components/clientes/clientes-table-skeleton"

export default function ClientesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground">Gestiona la información de los clientes de ATH Plásticos.</p>
      </div>

      <Card>
        <CardContent className="p-0 pt-6">
          <Suspense fallback={<ClientesTableSkeleton />}>
            <ClientesTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
