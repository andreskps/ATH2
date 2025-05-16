import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getMaquinaById } from "@/lib/data/maquinaria"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BackButton from "@/components/ui/back-button"
import MaquinaDetalle from "@/components/maquinaria/maquina-detalle"
import MaquinaHistorialMantenimiento from "@/components/maquinaria/maquina-historial-mantenimiento"
import MaquinaActions from "@/components/maquinaria/maquina-actions"

export const metadata: Metadata = {
  title: "Detalle de Máquina | ATH Plásticos",
  description: "Información detallada de la máquina",
}

export default async function MaquinaPage({ params }: { params: { id: string } }) {
  const maquina = await getMaquinaById(params.id)

  if (!maquina) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BackButton href="/maquinaria" />
          <h1 className="text-3xl font-bold tracking-tight">{maquina.nombre}</h1>
        </div>
        <MaquinaActions maquina={maquina} />
      </div>

      <Tabs defaultValue="detalles" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="detalles">Detalles</TabsTrigger>
          <TabsTrigger value="mantenimiento">Historial de Mantenimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="detalles" className="mt-6">
          <MaquinaDetalle maquina={maquina} />
        </TabsContent>

        <TabsContent value="mantenimiento" className="mt-6">
          <MaquinaHistorialMantenimiento maquinaId={maquina.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
