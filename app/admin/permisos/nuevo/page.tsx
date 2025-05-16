import type { Metadata } from "next"
import PermisoForm from "@/components/admin/permisos/permiso-form"

export const metadata: Metadata = {
  title: "Nuevo Permiso",
  description: "Crear un nuevo permiso en el sistema",
}

export default function NuevoPermisoPage() {
  return <PermisoForm />
}
