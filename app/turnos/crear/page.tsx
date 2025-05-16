import type { Metadata } from "next"
import BackButton from "@/components/ui/back-button"
import TurnoForm from "@/components/turnos/turno-form"

export const metadata: Metadata = {
  title: "Crear Turno | ATH Plásticos",
  description: "Crear un nuevo turno de producción",
}

export default function CrearTurnoPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center space-x-2">
        <BackButton href="/turnos" />
        <h1 className="text-3xl font-bold tracking-tight">Crear Turno</h1>
      </div>
      <div className="grid gap-6">
        <TurnoForm />
      </div>
    </div>
  )
}
