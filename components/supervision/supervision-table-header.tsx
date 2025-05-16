import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SupervisionTableHeader() {
  return (
    <div className="grid grid-cols-8 gap-3 rounded-t-md border-b bg-muted/50 p-4 text-sm font-medium">
      <div className="flex items-center gap-2">
        <span>Orden</span>
        <Button variant="ghost" size="icon" className="h-4 w-4">
          <ArrowUpDown className="h-3 w-3" />
          <span className="sr-only">Ordenar por ID</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Producto</span>
        <Button variant="ghost" size="icon" className="h-4 w-4">
          <ArrowUpDown className="h-3 w-3" />
          <span className="sr-only">Ordenar por producto</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Máquina</span>
        <Button variant="ghost" size="icon" className="h-4 w-4">
          <ArrowUpDown className="h-3 w-3" />
          <span className="sr-only">Ordenar por máquina</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Supervisor</span>
        <Button variant="ghost" size="icon" className="h-4 w-4">
          <ArrowUpDown className="h-3 w-3" />
          <span className="sr-only">Ordenar por supervisor</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Estado</span>
        <Button variant="ghost" size="icon" className="h-4 w-4">
          <ArrowUpDown className="h-3 w-3" />
          <span className="sr-only">Ordenar por estado</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Progreso</span>
        <Button variant="ghost" size="icon" className="h-4 w-4">
          <ArrowUpDown className="h-3 w-3" />
          <span className="sr-only">Ordenar por progreso</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Eficiencia</span>
        <Button variant="ghost" size="icon" className="h-4 w-4">
          <ArrowUpDown className="h-3 w-3" />
          <span className="sr-only">Ordenar por eficiencia</span>
        </Button>
      </div>
      <div className="text-right">Acciones</div>
    </div>
  )
}
