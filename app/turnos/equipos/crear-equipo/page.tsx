import type { Metadata } from "next"
import BackButton from "@/components/ui/back-button"
import EquipoForm from "@/components/turnos/equipo-form"

export const metadata: Metadata = {
  title: "Crear Equipo | ATH Plásticos",
  description: "Crear un nuevo equipo de trabajo",
}

export default function CrearEquipoPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center space-x-2">
        <BackButton href="/turnos/equipos" />
        <h1 className="text-3xl font-bold tracking-tight">Crear Equipo</h1>
      </div>
      <div className="grid gap-6">
        <EquipoForm />
      </div>
    </div>
  )
}
