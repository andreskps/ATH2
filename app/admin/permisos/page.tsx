import type { Metadata } from "next"
import { getPermisos } from "@/lib/data/roles"
import PermisosTable from "@/components/admin/permisos/permisos-table"
import PermisosTableHeader from "@/components/admin/permisos/permisos-table-header"

export const metadata: Metadata = {
  title: "Gestión de Permisos",
  description: "Administración de permisos del sistema",
}

export default function PermisosPage() {
  const permisos = getPermisos()

  return (
    <div className="flex flex-col gap-5">
      <PermisosTableHeader />
      <PermisosTable permisos={permisos} />
    </div>
  )
}
