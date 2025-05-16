import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SupervisionDashboard from "@/components/supervision/supervision-dashboard"
import SupervisionTable from "@/components/supervision/supervision-table"
import SupervisionFiltros from "@/components/supervision/supervision-filtros"
import SupervisionTableSkeleton from "@/components/supervision/supervision-table-skeleton"
import SupervisionTableHeader from "@/components/supervision/supervision-table-header"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Supervisión de Producción | ATH Plásticos",
  description: "Gestión y monitoreo de la producción en planta",
}

export default function SupervisionPage() {
  return (
    <main className="flex flex-col gap-8 p-4 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supervisión de Producción</h1>
          <p className="text-muted-foreground">Monitorea y controla la producción en tiempo real</p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="supervisiones">Supervisiones</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="p-0">
          <SupervisionDashboard />
        </TabsContent>
        <TabsContent value="supervisiones" className="p-0">
          <div className="flex flex-col gap-4">
            <SupervisionFiltros />
            <div className="rounded-md border">
              <SupervisionTableHeader />
              <Suspense fallback={<SupervisionTableSkeleton />}>
                <SupervisionTable />
              </Suspense>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
