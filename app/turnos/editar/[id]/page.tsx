import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BackButton from "@/components/ui/back-button"
import TurnoForm from "@/components/turnos/turno-form"
import { getTurnoById } from "@/lib/data/turnos"

export const metadata: Metadata = {
  title: "Editar Turno | ATH Plásticos",
  description: "Editar un turno de producción existente",
}

interface EditarTurnoPageProps {
  params: {
    id: string
  }
}

export default function EditarTurnoPage({ params }: EditarTurnoPageProps) {
  const turno = getTurnoById(params.id)

  if (!turno) {
    notFound()
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center space-x-2">
        <BackButton href={`/turnos/${params.id}`} />
        <h1 className="text-3xl font-bold tracking-tight">Editar Turno</h1>
      </div>
      <div className="grid gap-6">
        <TurnoForm turno={turno} />
      </div>
    </div>
  )
}
