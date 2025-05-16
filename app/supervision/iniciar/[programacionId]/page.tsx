import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SupervisionIniciarForm from "@/components/supervision/supervision-iniciar-form"
import { BackButton } from "@/components/ui/back-button"

export const metadata: Metadata = {
  title: "Iniciar Supervisión | ATH Plásticos",
  description: "Iniciar una nueva supervisión de producción",
}

export default function SupervisionIniciarPage({ params }: { params: { programacionId: string } }) {
  // Aquí se obtendría la programación por su ID
  const programacionId = params.programacionId

  // Si no existe la programación, redirigir a 404
  if (!programacionId) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-8 p-4 sm:p-8">
      <div className="flex items-center gap-4">
        <BackButton href="/supervision/pendientes" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Iniciar supervisión</h1>
          <p className="text-muted-foreground">Programación: {programacionId}</p>
        </div>
      </div>

      <SupervisionIniciarForm programacionId={programacionId} />
    </main>
  )
}
