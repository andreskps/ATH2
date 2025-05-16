import type { Metadata } from "next"
import RolesTable from "@/components/admin/roles/roles-table"
import RolesTableHeader from "@/components/admin/roles/roles-table-header"

export const metadata: Metadata = {
  title: "Roles y Permisos | ATH Plásticos",
  description: "Gestión de roles y permisos del sistema",
}

export default function RolesPage() {
  return (
    <div className="flex flex-col gap-5 p-8">
      <RolesTableHeader />
      <RolesTable />
    </div>
  )
}
