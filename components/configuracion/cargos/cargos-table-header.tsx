import { Button } from "@/components/ui/button"
import { Users, Plus } from "lucide-react"
import Link from "next/link"

export function CargosTableHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Users className="h-8 w-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cargos</h1>
          <p className="text-muted-foreground">Gestiona los cargos y posiciones de trabajo</p>
        </div>
      </div>
      <Button asChild>
        <Link href="/configuracion/cargos/nuevo">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cargo
        </Link>
      </Button>
    </div>
  )
}
