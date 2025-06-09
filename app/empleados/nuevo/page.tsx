import type { Metadata } from "next"
import EmpleadoForm from "@/components/empleados/empleado-form"
import BackButton  from "@/components/ui/back-button"

export const metadata: Metadata = {
  title: "Nuevo Empleado | ATH Plásticos",
  description: "Crear un nuevo empleado en el sistema",
}

export default function NuevoEmpleadoPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BackButton />
          <h1 className="text-3xl font-bold tracking-tight">Crear Nuevo Empleado</h1>
        </div>
      </div>
      <div className="rounded-lg border p-6 shadow-sm">
        <EmpleadoForm />
      </div>
    </div>
  )
}
