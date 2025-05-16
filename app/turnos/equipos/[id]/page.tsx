import { notFound } from "next/navigation"
import BackButton from "@/components/ui/back-button"
import { getEquipoById } from "@/lib/data/turnos"
import EquipoDetalle from "@/components/turnos/equipo-detalle"

export default function EquipoDetallePage({ params }: { params: { id: string } }) {
  const equipo = getEquipoById(params.id)

  if (!equipo) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <BackButton href="/turnos/equipos" />
        <h1 className="text-3xl font-bold tracking-tight">Detalle del Equipo</h1>
      </div>
      <EquipoDetalle equipo={equipo} />
    </div>
  )
}
