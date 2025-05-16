import type { Metadata } from "next"
import Link from "next/link"
import BackButton from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import EquiposTable from "@/components/turnos/equipos-table"

export const metadata: Metadata = {
  title: "Equipos de Trabajo | ATH Plásticos",
  description: "Gestión de equipos de trabajo para turnos de producción",
}

export default function EquiposPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <BackButton href="/turnos" />
          <h1 className="text-3xl font-bold tracking-tight">Equipos de Trabajo</h1>
        </div>
        <Button asChild>
          <Link href="/turnos/equipos/crear-equipo">
            <Plus className="mr-2 h-4 w-4" />
            Crear Equipo
          </Link>
        </Button>
      </div>
      <EquiposTable />
    </div>
  )
}
