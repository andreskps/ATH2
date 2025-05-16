import { EntregaForm } from "@/components/dotacion/entregas/entrega-form"

interface EditarEntregaPageProps {
  params: {
    id: string
  }
}

export default function EditarEntregaPage({ params }: EditarEntregaPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Entrega de Dotación</h1>
        <p className="text-muted-foreground">Modifica los datos de la entrega de dotación</p>
      </div>

      <EntregaForm entregaId={params.id} />
    </div>
  )
}
