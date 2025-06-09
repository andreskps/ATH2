import { Button } from "@/components/ui/button"
import { Building, Plus } from "lucide-react"
import Link from "next/link"

export function AreasTableHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Building className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Áreas</h1>
          <p className="text-muted-foreground">Gestiona las áreas de trabajo de la empresa</p>
        </div>
      </div>
      <Button asChild>
        <Link href="/configuracion/areas/nueva">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Área
        </Link>
      </Button>
    </div>
  )
}
