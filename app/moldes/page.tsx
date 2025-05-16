import { Suspense } from "react"
import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import MoldesTableSkeleton from "@/components/moldes/moldes-table-skeleton"
import MoldesTable from "@/components/moldes/moldes-table"

export const metadata: Metadata = {
  title: "Moldes | ATH Plásticos",
  description: "Gestión de moldes para la producción de productos plásticos",
}

export default function MoldesPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Moldes</h1>
        <p className="text-muted-foreground">
          Gestiona el catálogo de moldes utilizados en la producción de ATH Plásticos.
        </p>
      </div>

      <Card className="p-0">
        <Suspense fallback={<MoldesTableSkeleton />}>
          <MoldesTable />
        </Suspense>
      </Card>
    </div>
  )
}
