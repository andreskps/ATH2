import { HistorialDotacion } from "@/components/dotacion/empleados/historial-dotacion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface HistorialDotacionPageProps {
  params: {
    id: string
  }
}

// Esta función simula obtener los datos del empleado
async function getEmpleado(id: string) {
  // En una aplicación real, esto vendría de una API o base de datos
  const empleados = [
    { id: "emp-1", nombre: "Juan Pérez" },
    { id: "emp-2", nombre: "María Rodríguez" },
    { id: "emp-3", nombre: "Carlos Gómez" },
    { id: "emp-4", nombre: "Ana Martínez" },
    { id: "emp-5", nombre: "Luis Sánchez" },
  ]

  return empleados.find((emp) => emp.id === id) || { id, nombre: "Empleado no encontrado" }
}

export default async function HistorialDotacionPage({ params }: HistorialDotacionPageProps) {
  const empleado = await getEmpleado(params.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Historial de Dotación</h1>
          <p className="text-muted-foreground">Historial de dotación entregada a {empleado.nombre}</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/empleados/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Perfil
          </Link>
        </Button>
      </div>

      <HistorialDotacion empleadoId={params.id} empleadoNombre={empleado.nombre} />
    </div>
  )
}
