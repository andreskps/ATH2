import { EntregaDetalle } from "@/components/dotacion/entregas/entrega-detalle"

interface EntregaPageProps {
  params: {
    id: string
  }
}

export default function EntregaPage({ params }: EntregaPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Detalle de Entrega</h1>
        <p className="text-muted-foreground">Información detallada de la entrega de dotación</p>
      </div>

      <EntregaDetalle entregaId={params.id} />
    </div>
  )
}
