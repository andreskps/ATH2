import type { Metadata } from "next"
import BackButton from "@/components/ui/back-button"
import RolForm from "@/components/admin/roles/rol-form"

export const metadata: Metadata = {
  title: "Nuevo Rol | ATH Plásticos",
  description: "Crear un nuevo rol en el sistema",
}

export default function NuevoRolPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center gap-4">
        <BackButton href="/admin/roles" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Rol</h1>
          <p className="text-muted-foreground">Crea un nuevo rol y asigna sus permisos</p>
        </div>
      </div>
      <RolForm />
    </div>
  )
}
