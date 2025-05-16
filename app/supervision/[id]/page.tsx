import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSupervision } from "@/lib/data/supervision"
import SupervisionDetalle from "@/components/supervision/supervision-detalle"
import SupervisionRegistroProduccion from "@/components/supervision/supervision-registro-produccion"
import SupervisionParadas from "@/components/supervision/supervision-paradas"
import SupervisionDefectos from "@/components/supervision/supervision-defectos"
import SupervisionActions from "@/components/supervision/supervision-actions"
import BackButton from "@/components/ui/back-button"

export const metadata: Metadata = {
  title: "Detalle de Supervisión | ATH Plásticos",
  description: "Información detallada de la supervisión de producción",
}

export default function SupervisionDetallePage({ params }: { params: { id: string } }) {
  const supervision = getSupervision(params.id)

  if (!supervision) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-8 p-4 sm:p-8">
      <div className="flex items-center gap-4">
        <BackButton href="/supervision" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supervisión: {supervision.ordenId}</h1>
          <p className="text-muted-foreground">
            Producto: {supervision.productoId} | Máquina: {supervision.maquinaId}
          </p>
        </div>
      </div>

      <SupervisionActions supervision={supervision} />

      <Tabs defaultValue="detalle" className="w-full">
        <TabsList>
          <TabsTrigger value="detalle">Detalle</TabsTrigger>
          <TabsTrigger value="produccion">Registro de producción</TabsTrigger>
          <TabsTrigger value="paradas">Paradas</TabsTrigger>
          <TabsTrigger value="defectos">Defectos</TabsTrigger>
        </TabsList>
        <TabsContent value="detalle" className="p-0 pt-4">
          <SupervisionDetalle supervision={supervision} />
        </TabsContent>
        <TabsContent value="produccion" className="p-0 pt-4">
          <SupervisionRegistroProduccion supervisionId={supervision.id} />
        </TabsContent>
        <TabsContent value="paradas" className="p-0 pt-4">
          <SupervisionParadas supervisionId={supervision.id} />
        </TabsContent>
        <TabsContent value="defectos" className="p-0 pt-4">
          <SupervisionDefectos supervisionId={supervision.id} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
