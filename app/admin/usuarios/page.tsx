import type { Metadata } from "next"
import UsuariosTable from "@/components/admin/usuarios/usuarios-table"
import UsuariosTableHeader from "@/components/admin/usuarios/usuarios-table-header"

export const metadata: Metadata = {
  title: "Usuarios | ATH Plásticos",
  description: "Gestión de usuarios del sistema",
}

export default function UsuariosPage() {
  return (
    <div className="flex flex-col gap-5 p-8">
      <UsuariosTableHeader />
      <UsuariosTable />
    </div>
  )
}
