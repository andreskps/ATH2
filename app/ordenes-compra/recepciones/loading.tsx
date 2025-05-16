import { Skeleton } from "@/components/ui/skeleton"
import { RecepcionesTableSkeleton } from "@/components/ordenes-compra/recepciones-table-skeleton"
import { Table } from "@/components/ui/table"
import { RecepcionesTableHeader } from "@/components/ordenes-compra/recepciones-table-header"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </div>

      <Skeleton className="h-[120px] w-full" />

      <div className="border rounded-lg">
        <Table>
          <RecepcionesTableHeader />
          <RecepcionesTableSkeleton />
        </Table>
      </div>
    </div>
  )
}
