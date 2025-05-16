import type { Metadata } from "next"
import { OperacionMaquinas } from "@/components/maquinaria/operacion-maquinas"

export const metadata: Metadata = {
  title: "Operación de Maquinaria | ATH Plásticos",
  description: "Monitoreo en tiempo real de la operación de maquinaria de ATH Plásticos",
}

export default function OperacionMaquinariaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Operación de Maquinaria</h1>
        <p className="text-muted-foreground">Monitoreo en tiempo real del funcionamiento de las máquinas por área.</p>
      </div>
      <OperacionMaquinas />
    </div>
  )
}
