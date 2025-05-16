import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getMaquinaById } from "@/lib/data/maquinaria"
import BackButton from "@/components/ui/back-button"
import MaquinaForm from "@/components/maquinaria/maquina-form"

export const metadata: Metadata = {
  title: "Editar Máquina | ATH Plásticos",
  description: "Editar información de la máquina",
}

export default async function EditarMaquinaPage({ params }: { params: { id: string } }) {
  const maquina = await getMaquinaById(params.id)

  if (!maquina) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <BackButton href={`/maquinaria/${maquina.id}`} />
        <h1 className="text-3xl font-bold tracking-tight">Editar Máquina</h1>
      </div>
      <MaquinaForm maquina={maquina} />
    </div>
  )
}
