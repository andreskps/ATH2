import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"
import Link from "next/link"

export function ContratosTableHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FileText className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contratos</h1>
          <p className="text-muted-foreground">Gestiona los tipos de contratos laborales de la empresa</p>
        </div>
      </div>
      <Button asChild>
        <Link href="/configuracion/contratos/nuevo">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Contrato
        </Link>
      </Button>
    </div>
  )
}
