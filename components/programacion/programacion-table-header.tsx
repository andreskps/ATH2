import { Button } from "@/components/ui/button"
import { Calendar, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function ProgramacionTableHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Programación de Producción</h1>
      <div className="flex items-center gap-2">
        <Button asChild variant="default">
          <Link href="/programacion/ordenes-liberadas">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Programación
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/programacion/calendario-produccion">
            <Calendar className="mr-2 h-4 w-4" />
            Ver Calendario
          </Link>
        </Button>
      </div>
    </div>
  )
}
