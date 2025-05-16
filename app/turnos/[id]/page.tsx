import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import BackButton from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import TurnoDetalle from "@/components/turnos/turno-detalle"
import TurnoHistorial from "@/components/turnos/turno-historial"
import { getTurnoById } from "@/lib/data/turnos"

export const metadata: Metadata = {
  title: "Detalle de Turno | ATH Plásticos",
  description: "Información detallada del turno de producción",
}

interface TurnoPageProps {
  params: {
    id: string
  }
}

export default function TurnoPage({ params }: TurnoPageProps) {
  const turno = getTurnoById(params.id)

  if (!turno) {
    notFound()
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <BackButton href="/turnos" />
          <h1 className="text-3xl font-bold tracking-tight">Detalle del Turno</h1>
        </div>
        <Button asChild>
          <Link href={`/turnos/editar/${turno.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Turno
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TurnoDetalle turno={turno} />
        </div>
        <div>
          <TurnoHistorial turno={turno} />
        </div>
      </div>
    </div>
  )
}
