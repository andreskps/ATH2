import type { Metadata } from "next"
import PermisoForm from "@/components/admin/permisos/permiso-form"
import { getPermisoById } from "@/lib/data/roles"
import { notFound } from "next/navigation"

interface EditarPermisoPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EditarPermisoPageProps): Promise<Metadata> {
  const permiso = getPermisoById(params.id)

  if (!permiso) {
    return {
      title: "Permiso no encontrado",
    }
  }

  return {
    title: `Editar Permiso - ${permiso.nombre}`,
    description: `Editar el permiso ${permiso.nombre}`,
  }
}

export default function EditarPermisoPage({ params }: EditarPermisoPageProps) {
  const permiso = getPermisoById(params.id)

  if (!permiso) {
    notFound()
  }

  return <PermisoForm permisoId={params.id} />
}
