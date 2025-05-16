import { Suspense } from "react"
import { notFound } from "next/navigation"
import { BackButton } from "@/components/ui/back-button"
import { Skeleton } from "@/components/ui/skeleton"
import { getMaquinaById } from "@/lib/data/maquinaria"

interface SupervisionMaquinaPageProps {
  params: {
    id: string
  }
}

export default async function SupervisionMaquinaPage({ params }: SupervisionMaquinaPageProps) {
  const maquina = await getMaquinaById(params.id)

  if (!maquina) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <BackButton href="/maquinaria/operacion" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{maquina.nombre}</h1>
          <p className="text-muted-foreground">Supervisión detallada de la operación de la máquina</p>
        </div>
      </div>

      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <div className="grid gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Supervisión en tiempo real</h2>
            <p className="text-muted-foreground">
              Esta funcionalidad estará disponible próximamente. Aquí se mostrará un panel detallado con gráficos en
              tiempo real, parámetros de operación, y controles para la máquina.
            </p>
          </div>
        </div>
      </Suspense>
    </div>
  )
}
