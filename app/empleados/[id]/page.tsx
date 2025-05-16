import { notFound } from "next/navigation"
import { getEmpleadoById } from "@/lib/data/empleados"
import EmpleadoDetalle from "@/components/empleados/empleado-detalle"
import EmpleadoActions from "@/components/empleados/empleado-actions"
import BackButton from "@/components/ui/back-button"

interface EmpleadoPageProps {
  params: {
    id: string
  }
}

export default async function EmpleadoPage({ params }: EmpleadoPageProps) {
  const empleadoId = Number.parseInt(params.id)

  if (isNaN(empleadoId)) {
    notFound()
  }

  const empleado = await getEmpleadoById(empleadoId)

  if (!empleado) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <BackButton href="/empleados" />
          <h1 className="text-3xl font-bold tracking-tight">Detalles del Empleado</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Información detallada del empleado seleccionado.</p>
          <EmpleadoActions empleado={empleado} />
        </div>
      </div>

      <EmpleadoDetalle empleado={empleado} />
    </div>
  )
}
