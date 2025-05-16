import BackButton from "@/components/ui/back-button"
import ProgramacionCalendario from "@/components/programacion/programacion-calendario"

export default function CalendarioPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center">
        <BackButton href="/programacion" />
        <h1 className="text-2xl font-bold tracking-tight ml-2">Calendario de Producción</h1>
      </div>

      <ProgramacionCalendario />
    </div>
  )
}
