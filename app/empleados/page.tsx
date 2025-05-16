import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import EmpleadosTable from "@/components/empleados/empleados-table"
import EmpleadosTableSkeleton from "@/components/empleados/empleados-table-skeleton"

export default function EmpleadosPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Empleados</h1>
        <p className="text-muted-foreground">Gestiona la información de los empleados de ATH Plásticos.</p>
      </div>

      <Card>
        <CardContent className="p-0 pt-6">
          <Suspense fallback={<EmpleadosTableSkeleton />}>
            <EmpleadosTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
