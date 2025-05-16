import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SlidersHorizontal } from "lucide-react"

interface TurnosTableHeaderProps {
  columnas: {
    id: string
    label: string
    visible: boolean
  }[]
  onToggleColumn: (id: string) => void
}

export function TurnosTableHeader({ columnas, onToggleColumn }: TurnosTableHeaderProps) {
  return (
    <div className="flex items-center py-4 gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Columnas</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {columnas.map((columna) => (
            <DropdownMenuCheckboxItem
              key={columna.id}
              checked={columna.visible}
              onCheckedChange={() => onToggleColumn(columna.id)}
            >
              {columna.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
