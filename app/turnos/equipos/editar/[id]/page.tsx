import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BackButton from "@/components/ui/back-button"
import EquipoForm from "@/components/turnos/equipo-form"
import { getEquipoById } from "@/lib/data/turnos"

export const metadata: Metadata = {
  title: "Editar Equipo | ATH Plásticos",
  description: "Editar un equipo de trabajo existente",
}

interface EditarEquipoPageProps {
  params: {
    id: string
  }
}

export default function EditarEquipoPage({ params }: EditarEquipoPageProps) {
  const equipo = getEquipoById(params.id)

  if (!equipo) {
    notFound()
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center space-x-2">
        <BackButton href="/turnos/equipos" />
        <h1 className="text-3xl font-bold tracking-tight">Editar Equipo</h1>
      </div>
      <div className="grid gap-6">
        <EquipoForm equipo={equipo} />
      </div>
    </div>
  )
}
