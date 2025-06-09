import type { Metadata } from "next"
import { notFound } from "next/navigation"
import EmpleadoForm from "@/components/empleados/empleado-form"
import BackButton  from "@/components/ui/back-button"
import { getEmpleadoById } from "@/lib/data/empleados"
import { getUsuarioByEmail } from "@/lib/data/usuarios"
import { getRolesByUsuarioId } from "@/lib/data/roles"

export const metadata: Metadata = {
  title: "Editar Empleado | ATH Plásticos",
  description: "Editar información de empleado",
}

interface EditarEmpleadoPageProps {
  params: {
    id: string
  }
}

export default function EditarEmpleadoPage({ params }: EditarEmpleadoPageProps) {
  const id = Number.parseInt(params.id)
  const empleado = getEmpleadoById(id)

  if (!empleado) {
    notFound()
  }

  // Buscar si el empleado tiene un usuario asociado
  let usuarioExistente = null
  if (empleado.email) {
    const usuario = getUsuarioByEmail(empleado.email)
    if (usuario) {
      const roles = getRolesByUsuarioId(usuario.id)
      usuarioExistente = {
        id: usuario.id,
        email: usuario.email,
        rolId: roles.length > 0 ? roles[0].id : "",
      }
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BackButton />
          <h1 className="text-3xl font-bold tracking-tight">Editar Empleado</h1>
        </div>
      </div>
      <div className="rounded-lg border p-6 shadow-sm">
        <EmpleadoForm empleado={empleado} isEditing={true} usuarioExistente={usuarioExistente} />
      </div>
    </div>
  )
}
