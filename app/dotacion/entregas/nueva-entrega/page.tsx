import { EntregaForm } from "@/components/dotacion/entregas/entrega-form"

export default function NuevaEntregaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nueva Entrega de Dotación</h1>
        <p className="text-muted-foreground">Registra una nueva entrega de dotación a un empleado</p>
      </div>

      <EntregaForm />
    </div>
  )
}
