import type { Metadata } from "next"
import TurnoWizard from "@/components/turnos/turno-wizard"

export const metadata: Metadata = {
  title: "Crear Turno | ATH Plásticos",
  description: "Crear un nuevo turno de producción",
}

export default function CrearTurnoPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <TurnoWizard />
    </div>
  )
}
