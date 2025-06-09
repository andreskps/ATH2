import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EmpleadoForm from "@/components/empleados/empleado-form"
import { getEmpleadoById } from "@/lib/data/empleados"
import BackButton from "@/components/ui/back-button"

interface EditarEmpleadoPageProps {
  params: {
    id: string
  }
}

export default async function EditarEmpleadoPage({ params }: EditarEmpleadoPageProps) {
  const empleadoId = Number.parseInt(params.id)

  if (isNaN(empleadoId)) {
    notFound()
  }

  const empleado = await getEmpleadoById(empleadoId)

  if (!empleado) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <BackButton href={`/empleados/${empleado.id}`} />
          <h1 className="text-3xl font-bold tracking-tight">Editar Empleado</h1>
        </div>
        <p className="text-muted-foreground">Actualiza la información del empleado seleccionado.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulario de Edición</CardTitle>
          <CardDescription>Todos los campos marcados con * son obligatorios.</CardDescription>
        </CardHeader>
        <CardContent>
          <EmpleadoForm empleado={empleado} isEditing />
        </CardContent>
      </Card>
    </div>
  )
}
