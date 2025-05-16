import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EmpleadoForm from "@/components/empleados/empleado-form"
import BackButton from "@/components/ui/back-button"

export default function NuevoEmpleadoPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <BackButton href="/empleados" />
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Empleado</h1>
        </div>
        <p className="text-muted-foreground">Completa el formulario para registrar un nuevo empleado en el sistema.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulario de Registro</CardTitle>
          <CardDescription>Todos los campos marcados con * son obligatorios.</CardDescription>
        </CardHeader>
        <CardContent>
          <EmpleadoForm />
        </CardContent>
      </Card>
    </div>
  )
}
