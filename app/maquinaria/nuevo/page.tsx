import type { Metadata } from "next"
import BackButton from "@/components/ui/back-button"
import MaquinaForm from "@/components/maquinaria/maquina-form"

export const metadata: Metadata = {
  title: "Nueva Máquina | ATH Plásticos",
  description: "Crear una nueva máquina en el sistema",
}

export default function NuevaMaquinaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <BackButton href="/maquinaria" />
        <h1 className="text-3xl font-bold tracking-tight">Nueva Máquina</h1>
      </div>
      <MaquinaForm />
    </div>
  )
}
