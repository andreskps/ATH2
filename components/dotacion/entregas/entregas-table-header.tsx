"use client"

import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EntregasTableHeaderProps {
  sortColumn: string
  sortDirection: "asc" | "desc"
  onSort: (column: string) => void
}

export function EntregasTableHeader({ sortColumn, sortDirection, onSort }: EntregasTableHeaderProps) {
  const headers = [
    { key: "empleadoNombre", label: "Empleado" },
    { key: "tipoDotacion", label: "Tipo de Dotación" },
    { key: "talla", label: "Talla" },
    { key: "cantidad", label: "Cantidad" },
    { key: "fechaEntrega", label: "Fecha de Entrega" },
    { key: "estado", label: "Estado" },
  ]

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ArrowUpDownIcon className="ml-2 h-4 w-4" />
    return sortDirection === "asc" ? (
      <ArrowUpIcon className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDownIcon className="ml-2 h-4 w-4" />
    )
  }

  return (
    <thead className="bg-muted/50">
      <tr className="border-b">
        {headers.map((header) => (
          <th key={header.key} className="h-12 px-4 text-left align-middle font-medium">
            <Button
              variant="ghost"
              className={cn("flex items-center gap-1 p-0 font-medium", sortColumn === header.key && "text-primary")}
              onClick={() => onSort(header.key)}
            >
              {header.label}
              {getSortIcon(header.key)}
            </Button>
          </th>
        ))}
        <th className="h-12 px-4 text-right align-middle font-medium">Acciones</th>
      </tr>
    </thead>
  )
}
