import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BackButton from "@/components/ui/back-button"
import RolForm from "@/components/admin/roles/rol-form"
import { getRolById } from "@/lib/data/roles"

export const metadata: Metadata = {
  title: "Editar Rol | ATH Plásticos",
  description: "Editar un rol existente en el sistema",
}

export default function EditarRolPage({ params }: { params: { id: string } }) {
  const rol = getRolById(params.id)

  if (!rol) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center gap-4">
        <BackButton href="/admin/roles" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Rol</h1>
          <p className="text-muted-foreground">Modifica los detalles y permisos del rol</p>
        </div>
      </div>
      <RolForm rol={rol} />
    </div>
  )
}
