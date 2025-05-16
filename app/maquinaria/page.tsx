import type { Metadata } from "next"
import MaquinariaTable from "@/components/maquinaria/maquinaria-table"

export const metadata: Metadata = {
  title: "Maquinaria | ATH Plásticos",
  description: "Gestión de maquinaria de ATH Plásticos",
}

export default function MaquinariaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Maquinaria</h1>
        <p className="text-muted-foreground">Gestiona la maquinaria de producción de ATH Plásticos.</p>
      </div>
      <MaquinariaTable />
    </div>
  )
}
